import React from "react";
import IdentitySection from "./IdentitySection";
import CharacteristicsSection from "./CharacteristicsSection";
import InvestigatorPhoto from "./InvestigatorPhoto";
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

const HeaderSection: React.FC<HeaderSectionProps> = React.memo(
  ({ data, setIdentity, setCharacteristic, handlePhotoUpload }) => {
    return (
      <div className="header-section">
        <IdentitySection identity={data.identity} onValueChange={setIdentity} />
        <div className="vertical-separator" />

        <CharacteristicsSection
          characteristics={data.characteristics}
          onValueChange={setCharacteristic}
        />
        <div className="vertical-separator" />

        <InvestigatorPhoto
          photo={data.photo}
          onPhotoUpload={handlePhotoUpload}
        />
      </div>
    );
  },
);

export default HeaderSection;
