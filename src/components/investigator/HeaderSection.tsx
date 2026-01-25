import React from "react";
import { useTranslation } from "react-i18next";
import IdentitySection from "./IdentitySection";
import CharacteristicsSection from "./CharacteristicsSection";
import type { InvestigatorData } from "../../types";

interface HeaderSectionProps {
  data: InvestigatorData;
  setIdentity: (
    field: keyof InvestigatorData["identity"],
    value: string,
  ) => void;
  setCharacteristic: (stat: string, value: number) => void;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  data,
  setIdentity,
  setCharacteristic,
  handlePhotoUpload,
}) => {
  const { t } = useTranslation();

  return (
    <div className="header-section">
      <IdentitySection identity={data.identity} onValueChange={setIdentity} />
      <div className="vertical-separator" />

      <CharacteristicsSection
        characteristics={data.characteristics}
        onValueChange={setCharacteristic}
      />
      <div className="vertical-separator" />

      {/* Logo/Photo Column */}
      <div className="header-col right">
        <div className="logo-container">
          <div className="call-of-label">{t("call_of")}</div>
          <div className="cthulhu-label">CTHULHU</div>
        </div>
        <label
          className="photo-box"
          style={{ backgroundImage: `url(${data.photo})` }}
        >
          {!data.photo && t("photo")}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handlePhotoUpload}
            aria-label={t("photo_upload")}
          />
        </label>
      </div>
    </div>
  );
};

export default HeaderSection;
