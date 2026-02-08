import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import "./ImportUrlModal.css";

interface ImportUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (url: string) => void;
}

const ImportUrlModal: React.FC<ImportUrlModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");

  const handleClose = useCallback(() => {
    setUrl("");
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (url.trim()) {
        onImport(url.trim());
        handleClose();
      }
    },
    [url, onImport, handleClose],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t("import_url", "Import from URL")}
    >
      <form onSubmit={handleSubmit} className="import-url-modal-content">
        <p>
          {t("enter_import_url", "Enter the URL of the investigator JSON:")}
        </p>
        <input
          type="url"
          className="import-url-input"
          placeholder="https://example.com/investigator.json"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          autoFocus
          required
        />
        <div className="import-url-actions">
          <Button variant="secondary" onClick={handleClose} type="button">
            {t("cancel", "Cancel")}
          </Button>
          <Button variant="primary" type="submit" disabled={!url.trim()}>
            {t("import", "Import")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ImportUrlModal;
