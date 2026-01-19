import React from "react";
import { useTranslation } from "react-i18next";
import type { InvestigatorData } from "../../types";
import { SectionTitle } from "../ui/SectionTitle";

interface FellowInvestigatorsSectionProps {
  fellows: InvestigatorData["fellowInvestigators"];
  onValueChange: (
    index: number,
    field: keyof InvestigatorData["fellowInvestigators"][0],
    value: string,
  ) => void;
}

const FellowInvestigatorsSection: React.FC<FellowInvestigatorsSectionProps> = ({
  fellows,
  onValueChange,
}) => {
  const { t } = useTranslation();

  const renderFriendBox = (index: number) => {
    const friend = fellows[index];
    return (
      <div className="friend-box">
        <div className="field-row">
          <span className="field-label">{t("char_name")}:</span>
          <input
            className="friend-input"
            value={friend.name}
            onChange={(e) => onValueChange(index, "name", e.target.value)}
          />
        </div>
        <div className="field-row">
          <span className="field-label">{t("char_player")}:</span>
          <input
            className="friend-input"
            value={friend.player}
            onChange={(e) => onValueChange(index, "player", e.target.value)}
          />
        </div>
      </div>
    );
  };

  const renderTentacleLines = () => {
    return Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className={`tentacle-line line-${i + 1}`} />
    ));
  };

  const renderFellows = () => {
    const layout: Array<number | "me"> = [0, 6, 3, 1, "me", 4, 2, 7, 5];
    return layout.map((cell, i) => (
      <div key={i} className="friend-grid-cell">
        {cell === "me" ? (
          <div className="moi-circle">{t("me")}</div>
        ) : (
          renderFriendBox(cell)
        )}
      </div>
    ));
  };

  return (
    <div className="grow fellow-investigators-section">
      <SectionTitle>{t("friends")}</SectionTitle>
      <div className="friends-layout">
        <div className="tentacles-bg">{renderTentacleLines()}</div>
        {renderFellows()}
      </div>
    </div>
  );
};

export default FellowInvestigatorsSection;
