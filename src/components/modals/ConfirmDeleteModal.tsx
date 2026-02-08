import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import "./ConfirmDeleteModal.css";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  investigatorName?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  investigatorName,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("delete_investigator", "Delete Investigator")}
    >
      <div className="confirm-delete-modal-content">
        <p>
          {t(
            "confirm_delete",
            "Are you sure you want to delete this investigator?",
          )}
          {investigatorName && (
            <span className="investigator-name">{investigatorName}</span>
          )}
        </p>
        <div className="confirm-delete-actions">
          <Button variant="secondary" onClick={onClose}>
            {t("cancel", "Cancel")}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {t("delete", "Delete")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
