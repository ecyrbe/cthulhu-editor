import React from "react";
import { useTranslation } from "react-i18next";

interface InvestigatorPhotoProps {
  photo?: string;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InvestigatorPhoto: React.FC<InvestigatorPhotoProps> = ({
  photo,
  onPhotoUpload,
}) => {
  const { t } = useTranslation();

  return (
    <div className="header-col right">
      <div className="logo-container">
        <div className="call-of-label">{t("call_of")}</div>
        <div className="cthulhu-label">CTHULHU</div>
      </div>
      <label
        className="photo-box"
        style={{ backgroundImage: photo ? `url(${photo})` : undefined }}
      >
        {!photo && t("photo")}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={onPhotoUpload}
          aria-label={t("photo_upload")}
        />
      </label>
    </div>
  );
};

export default InvestigatorPhoto;
