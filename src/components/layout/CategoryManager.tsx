import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../../db/db";
import { type Category } from "../../types";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import binIcon from "../../assets/bin.svg";
import "./CategoryManager.css";

interface CategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoriesChanged: () => void;
}

const COLOR_PALETTE = [
  "#2c3e50", // Midnight Blue
  "#c0392b", // Pomegranate Red
  "#2980b9", // Belize Hole Blue
  "#27ae60", // Nephritis Green
  "#f39c12", // Orange
  "#8e44ad", // Wisteria Purple
  "#16a085", // Green Sea
  "#d35400", // Pumpkin Orange
  "#2c2c2c", // Dark Charcoal
  "#b71540", // Imperial Red
  "#0a3d62", // Dark Sapphire
  "#079992", // Waterfall
  "#786fa6", // Deep Koamaru
  "#cf6a87", // Old Rose
  "#6a89cc", // Livid
  "#4a69bd", // Spirit Blue
  "#38ada9", // Reefline
  "#e74c3c", // Alizarin Red
  "#3498db", // Peter River Blue
  "#2ecc71", // Emerald Green
  "#f1c40f", // Sunflower Yellow
  "#9b59b6", // Amethyst Purple
  "#e67e22", // Carrot Orange
  "#1abc9c", // Turquoise
  "#e91e63", // Pink
  "#bdc3c7", // Silver
];

const CategoryManager: React.FC<CategoryManagerProps> = ({
  isOpen,
  onClose,
  onCategoriesChanged,
}) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState(COLOR_PALETTE[0]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingColor, setEditingColor] = useState("");

  const loadCategories = async () => {
    const all = await db.categories.toArray();
    setCategories(all.sort((a, b) => a.name.localeCompare(b.name)));
  };

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      await db.categories.add({
        name: newCategoryName.trim(),
        color: newCategoryColor,
      });
      setNewCategoryName("");
      setNewCategoryColor(COLOR_PALETTE[0]);
      await loadCategories();
      onCategoriesChanged();
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };

  const handleRename = async (id: number) => {
    if (!editingName.trim()) return;
    await db.categories.update(id, {
      name: editingName.trim(),
      color: editingColor,
    });
    setEditingId(null);
    await loadCategories();
    onCategoriesChanged();
  };

  const handleDelete = async (id: number) => {
    if (
      confirm(
        t(
          "confirm_delete_category",
          "Are you sure you want to delete this category? Sheets inside will become uncategorized.",
        ),
      )
    ) {
      await db.transaction("rw", db.categories, db.investigators, async () => {
        await db.categories.delete(id);
        await db.investigators
          .where("categoryId")
          .equals(id)
          .modify({ categoryId: undefined });
      });
      await loadCategories();
      onCategoriesChanged();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("manage_categories", "Manage Categories")}
    >
      <div className="category-manager">
        <form onSubmit={handleAdd} className="add-category-form">
          <div className="input-group">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder={t("new_category_name", "New category name...")}
              className="category-input"
            />
            <div className="palette-strip">
              {COLOR_PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-swatch ${newCategoryColor === c ? "active" : ""}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setNewCategoryColor(c)}
                />
              ))}
            </div>
          </div>
          <Button type="submit" size="sm">
            {t("add", "Add")}
          </Button>
        </form>

        <div className="category-list-manage">
          {categories.length === 0 && (
            <p className="empty-msg">
              {t("no_categories", "No categories created yet.")}
            </p>
          )}
          {categories.map((cat) => (
            <div key={cat.id} className="category-item-manage">
              {editingId === cat.id ? (
                <div className="edit-box">
                  <div className="input-group">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      autoFocus
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleRename(cat.id!)
                      }
                      className="category-input-edit"
                    />
                    <div className="palette-strip">
                      {COLOR_PALETTE.map((c) => (
                        <button
                          key={c}
                          type="button"
                          className={`color-swatch ${editingColor === c ? "active" : ""}`}
                          style={{ backgroundColor: c }}
                          onClick={() => setEditingColor(c)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="edit-actions">
                    <Button size="sm" onClick={() => handleRename(cat.id!)}>
                      {t("save", "Save")}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setEditingId(null)}
                    >
                      {t("cancel", "Cancel")}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="cat-info"
                    onClick={() => {
                      setEditingId(cat.id!);
                      setEditingName(cat.name);
                      setEditingColor(cat.color || COLOR_PALETTE[0]);
                    }}
                  >
                    <div
                      className="cat-color-preview"
                      style={{ backgroundColor: cat.color || COLOR_PALETTE[0] }}
                    />
                    <span className="cat-name">{cat.name}</span>
                  </div>
                  <div className="cat-actions">
                    <button
                      className="delete-cat-btn"
                      onClick={() => handleDelete(cat.id!)}
                    >
                      <img src={binIcon} alt="Delete" width="16" height="16" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default CategoryManager;
