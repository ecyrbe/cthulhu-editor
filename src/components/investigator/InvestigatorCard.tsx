import React from "react";
import { useTranslation } from "react-i18next";
import { type InvestigatorData } from "../../types";
import binIcon from "../../assets/bin.svg";
import exportIcon from "../../assets/floppy-disk-arrow-out.svg";
import folderIcon from "../../assets/folder.svg";

interface InvestigatorCardProps {
  inv: InvestigatorData;
  isActiveDragging: boolean;
  onDragStart: (e: React.DragEvent, id: number) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent, inv: InvestigatorData) => void;
  onClick: () => void;
  onDelete: (e: React.MouseEvent, id: number) => void;
  onExport: (e: React.MouseEvent, inv: InvestigatorData) => void;
  onChangeCategory: (e: React.MouseEvent, inv: InvestigatorData) => void;
}

const InvestigatorCard: React.FC<InvestigatorCardProps> = ({
  inv,
  isActiveDragging,
  onDragStart,
  onDragEnd,
  onDragOver,
  onClick,
  onDelete,
  onExport,
  onChangeCategory,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`investigator-card ${isActiveDragging ? "is-dragging" : ""}`}
      draggable="true"
      onDragStart={(e) => onDragStart(e, inv.id!)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver(e, inv)}
      onClick={onClick}
    >
      <div className="photo-container">
        {inv.photo ? (
          <img src={inv.photo} alt={inv.identity.name} />
        ) : (
          <div className="photo-placeholder">?</div>
        )}
      </div>
      <div className="investigator-details">
        <h3>{inv.identity.name || t("unnamed", "Unnamed")}</h3>
        <p className="occupation">
          {inv.identity.occupation || t("no_occupation", "No occupation")}
        </p>
      </div>
      <div className="card-actions">
        <button
          className="card-action-btn delete-btn"
          onClick={(e) => onDelete(e, inv.id!)}
          title={t("delete", "Delete")}
        >
          <img src={binIcon} alt="" width="16" height="16" />
        </button>
        <button
          className="card-action-btn export-btn"
          onClick={(e) => onExport(e, inv)}
          title={t("export", "Export")}
        >
          <img src={exportIcon} alt="" width="16" height="16" />
        </button>
        <button
          className="card-action-btn folder-btn"
          onClick={(e) => onChangeCategory(e, inv)}
          title={t("change_category", "Change Category")}
        >
          <img src={folderIcon} alt="" width="16" height="16" />
        </button>
      </div>
    </div>
  );
};

export default InvestigatorCard;
