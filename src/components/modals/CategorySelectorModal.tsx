import React from "react";
import { useTranslation } from "react-i18next";
import { type Category } from "../../types";
import Modal from "../ui/Modal";
import "./CategorySelectorModal.css";

interface CategorySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  currentCategoryId?: number;
  onSelect: (categoryId?: number) => void;
}

const CategorySelectorModal: React.FC<CategorySelectorModalProps> = ({
  isOpen,
  onClose,
  categories,
  currentCategoryId,
  onSelect,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("select_category", "Select Category")}
    >
      <div className="category-selector-list">
        <div
          className={`category-selector-item ${!currentCategoryId ? "active" : ""}`}
          onClick={() => {
            onSelect(undefined);
            onClose();
          }}
        >
          <div
            className="cat-color-preview"
            style={{ backgroundColor: "#7f8c8d" }}
          />
          <span className="cat-name">
            {t("uncategorized", "Uncategorized")}
          </span>
        </div>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`category-selector-item ${
              currentCategoryId === cat.id ? "active" : ""
            }`}
            onClick={() => {
              onSelect(cat.id);
              onClose();
            }}
          >
            <div
              className="cat-color-preview"
              style={{ backgroundColor: cat.color || "#2c3e50" }}
            />
            <span className="cat-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default CategorySelectorModal;
