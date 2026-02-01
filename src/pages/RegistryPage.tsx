import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../db/db";
import {
  InvestigatorDataSchema,
  type InvestigatorData,
  type Category,
} from "../types";
import { getInitialData } from "../store/investigatorAtoms";
import { showEmptyCategoriesAtom } from "../store/uiAtoms";
import { normalize } from "../utils/normalize";
import Footer from "../components/layout/Footer";
import LanguageSelector from "../components/layout/LanguageSelector";
import ThemeToggle from "../components/ui/ThemeToggle";
import Button from "../components/ui/Button";
import LoadingScreen from "../components/ui/LoadingScreen";
import ScrollToTop from "../components/ui/ScrollToTop";
import Toggle from "../components/ui/Toggle";
import CategoryManager from "../components/layout/CategoryManager";
import InvestigatorCard from "../components/investigator/InvestigatorCard";
import CategorySelectorModal from "../components/investigator/CategorySelectorModal";

// Icons
import importIcon from "../assets/floppy-disk-arrow-in.svg";
import folderSettingsIcon from "../assets/folder-settings.svg";
import linkIcon from "../assets/link.svg";

import "./RegistryPage.css";

const RegistryPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [investigators, setInvestigators] = useState<InvestigatorData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragOverCategoryId, setDragOverCategoryId] = useState<
    number | "uncategorized" | null
  >(null);
  const [dragOverInvId, setDragOverInvId] = useState<number | null>(null);
  const [dragSide, setDragSide] = useState<"before" | "after" | null>(null);
  const [activeDragId, setActiveDragId] = useState<number | null>(null);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [isCategorySelectorOpen, setIsCategorySelectorOpen] = useState(false);
  const [selectedInvForCategory, setSelectedInvForCategory] =
    useState<InvestigatorData | null>(null);
  const [showEmptyCategories, setShowEmptyCategories] = useAtom(
    showEmptyCategoriesAtom,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadData = async () => {
    try {
      const [allInv, allCat] = await Promise.all([
        db.investigators.toArray(),
        db.categories.toArray(),
      ]);
      setInvestigators(allInv);
      setCategories(allCat);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (categoryId?: number) => {
    const newData = getInitialData();
    newData.categoryId = categoryId;

    const id = await db.investigators.add(newData);
    navigate(`/edit/${id}`);
  };

  const handleExport = (e: React.MouseEvent, data: InvestigatorData) => {
    e.preventDefault();
    e.stopPropagation();

    // Remove local database properties for export
    const exportData = { ...data };
    delete exportData.id;
    delete exportData.categoryId;
    delete exportData.category;

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `investigator-${normalize(data.identity.name) || "unnamed"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(
      t("toast_export_success", "Investigator exported successfully!"),
    );
  };

  const onDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("investigatorId", id.toString());
    // Use a small timeout so the element is still visible when the drag starts
    // before we hide it in the list
    setTimeout(() => setActiveDragId(id), 0);
  };

  const cleanupDragState = () => {
    setActiveDragId(null);
    setDragOverInvId(null);
    setDragOverCategoryId(null);
    setDragSide(null);
  };

  const onDragEnd = () => {
    cleanupDragState();
  };

  const onDragOver = (e: React.DragEvent, catId: number | "uncategorized") => {
    e.preventDefault();
    setDragOverCategoryId(catId);
  };

  const onDrop = async (
    e: React.DragEvent,
    targetCatId: number | "uncategorized",
  ) => {
    e.preventDefault();
    const currentDragOverInvId = dragOverInvId;
    const currentDragSide = dragSide;
    cleanupDragState();

    const id = e.dataTransfer.getData("investigatorId");
    if (!id) return;

    const invId = parseInt(id);
    const movingInv = investigators.find((i) => i.id === invId);
    if (!movingInv) return;

    const finalCatId =
      targetCatId === "uncategorized" ? undefined : targetCatId;

    // Get all investigators in the target category (excluding the moving one if it was already there)
    const categoryInvs = investigators
      .filter((i) => i.categoryId === finalCatId && i.id !== invId)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    let newList: InvestigatorData[] = [];
    if (currentDragOverInvId) {
      // Find the index of the target investigator
      const targetIdx = categoryInvs.findIndex(
        (i) => i.id === currentDragOverInvId,
      );
      const insertionIdx =
        currentDragSide === "after" ? targetIdx + 1 : targetIdx;

      newList = [
        ...categoryInvs.slice(0, insertionIdx),
        { ...movingInv, categoryId: finalCatId },
        ...categoryInvs.slice(insertionIdx),
      ];
    } else {
      // Drop on category space -> added to end ONLY if coming from another category
      if (movingInv.categoryId === finalCatId) {
        return; // Stay in place
      }
      newList = [...categoryInvs, { ...movingInv, categoryId: finalCatId }];
    }

    // Update orders for everything in this list
    const updates = newList.map((inv, index) => {
      const updated = { ...inv, order: index };
      return updated;
    });

    try {
      await db.transaction("rw", db.investigators, async () => {
        for (const up of updates) {
          await db.investigators.put(up);
        }
      });

      await loadData();
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error(t("toast_error", "Something went wrong"));
    }
  };

  if (loading) return <LoadingScreen />;

  const handleImportUrl = async () => {
    const url = window.prompt(
      t("enter_import_url", "Enter the URL of the investigator JSON:"),
    );
    if (!url) return;

    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
      const json = await response.json();
      const result = InvestigatorDataSchema.safeParse(json);

      if (!result.success) {
        toast.error(t("toast_import_error", "Failed to import"));
        return;
      }

      const dataToSave = { ...result.data };
      delete dataToSave.id;
      await db.investigators.add(dataToSave as InvestigatorData);

      await loadData();

      toast.success(
        t("toast_import_success", "Investigator imported successfully!"),
      );
    } catch (error) {
      console.error("URL Import failed:", error);
      toast.error(t("toast_import_error", "Failed to import"));
    } finally {
      setLoading(false);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          const result = InvestigatorDataSchema.safeParse(json);

          if (!result.success) {
            console.error("Import validation failed:", result.error);
            toast.error(
              t("toast_import_error", "Failed to import: Invalid file format"),
            );
            return;
          }

          // Strip the id to avoid conflicts when importing to a new database
          const dataToSave = { ...result.data };
          delete dataToSave.id;

          // Ensure sanityMax is correct on import
          const cthulhuSkill = dataToSave.skills?.find(
            (s) => s.type === "standard" && s.key === "cthulhu",
          );
          if (cthulhuSkill && cthulhuSkill.type === "standard") {
            dataToSave.trackers = {
              ...(dataToSave.trackers || {}),
              sanityMax: 99 - (Number(cthulhuSkill.current) || 0),
            };
          }

          await db.investigators.add(dataToSave as InvestigatorData);

          await loadData();

          toast.success(
            t("toast_import_success", "Investigator imported successfully!"),
          );
        } catch (error) {
          toast.error(t("toast_import_error", "Failed to import character"));
          console.error(error);
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    e.target.value = "";
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      confirm(
        t(
          "confirm_delete",
          "Are you sure you want to delete this investigator?",
        ),
      )
    ) {
      await db.investigators.delete(id);
      setInvestigators(investigators.filter((i) => i.id !== id));
    }
  };

  const handleOpenCategorySelector = (
    e: React.MouseEvent,
    inv: InvestigatorData,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedInvForCategory(inv);
    setIsCategorySelectorOpen(true);
  };

  const handleCategoryChange = async (categoryId?: number) => {
    if (!selectedInvForCategory || selectedInvForCategory.id === undefined)
      return;

    try {
      await db.investigators.update(selectedInvForCategory.id, { categoryId });
      await loadData();
      toast.success(t("toast_category_updated", "Category updated"));
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error(t("toast_error", "Something went wrong"));
    }
  };

  const handleCardDragOver = (e: React.DragEvent, inv: InvestigatorData) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseXRelativeToCard = e.clientX - rect.left;

    // In a multi-column grid, we mostly care about horizontal position
    // If the mouse is in the first 50% of the card width, it's "before"
    const side = mouseXRelativeToCard < rect.width / 2 ? "before" : "after";

    if (dragOverInvId !== inv.id || dragSide !== side) {
      setDragOverInvId(inv.id!);
      setDragSide(side);
    }
  };

  return (
    <div className="registry-page-container">
      <Toaster position="bottom-right" />
      <div className="registry-page">
        <div className="registry-sticky-top">
          <header className="registry-page-header">
            <div className="breadcrumb">
              <Link to="/">{t("home", "Home")}</Link> /{" "}
              <span>{t("registry", "Registry")}</span>
            </div>
            <div className="header-actions">
              <ThemeToggle />
              <LanguageSelector align="right" />
            </div>
          </header>

          <div className="registry-header">
            <h1>{t("my_investigators", "My Investigators")}</h1>
            <div className="header-actions">
              <div className="registry-toolbar">
                <Button
                  variant="action"
                  size="icon"
                  circle
                  onClick={() => fileInputRef.current?.click()}
                  title={t("import", "Import from file")}
                >
                  <img src={importIcon} alt="" width="20" height="20" />
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <Button
                  variant="action"
                  size="icon"
                  circle
                  onClick={handleImportUrl}
                  title={t("import_url", "Import from URL")}
                >
                  <img src={linkIcon} alt="" width="20" height="20" />
                </Button>
                <div className="toolbar-separator" />
                <Toggle
                  active={showEmptyCategories}
                  onChange={setShowEmptyCategories}
                  label={t("show_empty", "Show empty")}
                  title={t(
                    "toggle_empty_categories",
                    "Show/Hide empty categories",
                  )}
                />
                <Button
                  variant="primary"
                  size="icon"
                  circle
                  onClick={() => setIsCategoryManagerOpen(true)}
                  title={t("manage_categories", "Manage Categories")}
                >
                  <img src={folderSettingsIcon} alt="" width="20" height="20" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="investigator-list-container">
          {investigators.length === 0 && categories.length === 0 ? (
            <div className="empty-message">
              <p>
                {t(
                  "no_investigators_found",
                  "No investigators found. Create your first one!",
                )}
              </p>
              <Button onClick={() => handleCreate()}>
                {t("new_investigator", "New Investigator")}
              </Button>
            </div>
          ) : (
            <>
              {/* Categorized Investigators */}
              {categories
                .filter((cat) => {
                  if (showEmptyCategories || investigators.length === 0)
                    return true;
                  return investigators.some((i) => i.categoryId === cat.id);
                })
                .map((cat) => {
                  const catInvs = investigators
                    .filter(
                      (i) => i.categoryId === cat.id && i.id !== activeDragId,
                    )
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                  return (
                    <section
                      key={cat.id}
                      className={`category-section ${dragOverCategoryId === cat.id && !dragOverInvId ? "drag-over" : ""}`}
                      style={
                        {
                          "--category-color": cat.color || "#2c3e50",
                        } as React.CSSProperties
                      }
                      onDragOver={(e) => {
                        onDragOver(e, cat.id!);
                        if (e.target === e.currentTarget) {
                          setDragOverInvId(null);
                          setDragSide(null);
                        }
                      }}
                      onDragLeave={() => setDragOverCategoryId(null)}
                      onDrop={(e) => onDrop(e, cat.id!)}
                    >
                      <div className="category-header">
                        <h2 className="category-title">{cat.name}</h2>
                        <button
                          className="add-to-category-btn"
                          onClick={() => handleCreate(cat.id)}
                          title={t(
                            "add_to_category",
                            "Add a new investigator to this category",
                          )}
                        >
                          +
                        </button>
                      </div>
                      <div className="investigator-list">
                        {catInvs.length === 0 ? (
                          <div
                            className={`empty-category-msg ${
                              dragOverCategoryId === cat.id && activeDragId
                                ? "is-dragging-over"
                                : ""
                            }`}
                          >
                            <p>
                              {t(
                                "empty_category",
                                "No investigators in this category.",
                              )}
                            </p>
                            <Button onClick={() => handleCreate(cat.id)}>
                              {t("new_investigator", "New Investigator")}
                            </Button>
                          </div>
                        ) : (
                          catInvs.map((inv) => {
                            const isOver = dragOverInvId === inv.id;
                            // Determine if placeholder should be before or after the target card
                            const showBefore = isOver && dragSide === "before";
                            const showAfter = isOver && dragSide === "after";

                            return (
                              <React.Fragment key={inv.id}>
                                {showBefore && (
                                  <div className="drag-placeholder" />
                                )}
                                <InvestigatorCard
                                  inv={inv}
                                  isActiveDragging={activeDragId === inv.id}
                                  onDragStart={onDragStart}
                                  onDragEnd={onDragEnd}
                                  onDragOver={(e) => handleCardDragOver(e, inv)}
                                  onClick={() => navigate(`/edit/${inv.id}`)}
                                  onDelete={handleDelete}
                                  onExport={handleExport}
                                  onChangeCategory={handleOpenCategorySelector}
                                />
                                {showAfter && (
                                  <div className="drag-placeholder" />
                                )}
                              </React.Fragment>
                            );
                          })
                        )}
                        {dragOverCategoryId === cat.id &&
                          !dragOverInvId &&
                          activeDragId && <div className="drag-placeholder" />}
                      </div>
                    </section>
                  );
                })}

              {/* Uncategorized Investigators */}
              {(() => {
                const uncategorizedInvs = investigators
                  .filter((i) => !i.categoryId)
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                if (
                  !showEmptyCategories &&
                  uncategorizedInvs.length === 0 &&
                  investigators.length > 0
                ) {
                  return null;
                }
                return (
                  <section
                    className={`category-section ${dragOverCategoryId === "uncategorized" && !dragOverInvId ? "drag-over" : ""}`}
                    style={
                      {
                        "--category-color": "#7f8c8d",
                      } as React.CSSProperties
                    }
                    onDragOver={(e) => {
                      onDragOver(e, "uncategorized");
                      if (e.target === e.currentTarget) {
                        setDragOverInvId(null);
                        setDragSide(null);
                      }
                    }}
                    onDragLeave={() => setDragOverCategoryId(null)}
                    onDrop={(e) => onDrop(e, "uncategorized")}
                  >
                    <div className="category-header">
                      <h2 className="category-title">
                        {t("uncategorized", "Uncategorized")}
                      </h2>
                      <button
                        className="add-to-category-btn"
                        onClick={() => handleCreate()}
                        title={t(
                          "add_to_category",
                          "Add a new investigator to this category",
                        )}
                      >
                        +
                      </button>
                    </div>
                    <div className="investigator-list">
                      {uncategorizedInvs.length === 0 ? (
                        <div
                          className={`empty-category-msg ${
                            dragOverCategoryId === "uncategorized" &&
                            activeDragId
                              ? "is-dragging-over"
                              : ""
                          }`}
                        >
                          <p>
                            {t(
                              "empty_category",
                              "No investigators in this category.",
                            )}
                          </p>
                          <Button onClick={() => handleCreate()}>
                            {t("new_investigator", "New Investigator")}
                          </Button>
                        </div>
                      ) : (
                        uncategorizedInvs.map((inv) => {
                          const isOver = dragOverInvId === inv.id;

                          // Determine if placeholder should be before or after the target card
                          const showBefore = isOver && dragSide === "before";
                          const showAfter = isOver && dragSide === "after";

                          return (
                            <React.Fragment key={inv.id}>
                              {showBefore && (
                                <div className="drag-placeholder" />
                              )}
                              <InvestigatorCard
                                inv={inv}
                                isActiveDragging={activeDragId === inv.id}
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                                onDragOver={(e) => handleCardDragOver(e, inv)}
                                onClick={() => navigate(`/edit/${inv.id}`)}
                                onDelete={handleDelete}
                                onExport={handleExport}
                                onChangeCategory={handleOpenCategorySelector}
                              />
                              {showAfter && (
                                <div className="drag-placeholder" />
                              )}
                            </React.Fragment>
                          );
                        })
                      )}
                      {dragOverCategoryId === "uncategorized" &&
                        !dragOverInvId &&
                        activeDragId && <div className="drag-placeholder" />}
                    </div>
                  </section>
                );
              })()}
            </>
          )}
        </div>
      </div>
      <CategoryManager
        isOpen={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
        onCategoriesChanged={loadData}
      />
      <CategorySelectorModal
        isOpen={isCategorySelectorOpen}
        onClose={() => {
          setIsCategorySelectorOpen(false);
          setSelectedInvForCategory(null);
        }}
        categories={categories}
        currentCategoryId={selectedInvForCategory?.categoryId}
        onSelect={handleCategoryChange}
      />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default RegistryPage;
