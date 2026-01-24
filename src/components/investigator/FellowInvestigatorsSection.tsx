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

interface FriendBoxProps {
  friend: InvestigatorData["fellowInvestigators"][0];
  index: number;
  onValueChange: (
    index: number,
    field: keyof InvestigatorData["fellowInvestigators"][0],
    value: string,
  ) => void;
}

const FriendBox: React.FC<FriendBoxProps> = ({
  friend,
  index,
  onValueChange,
}) => {
  const { t } = useTranslation();
  return (
    <div className="friend-box">
      <label className="field-row">
        <span className="field-label">{t("char_name")}:</span>
        <input
          className="friend-input"
          value={friend.name ?? ""}
          onChange={(e) => onValueChange(index, "name", e.target.value)}
        />
      </label>
      <label className="field-row">
        <span className="field-label">{t("char_player")}:</span>
        <input
          className="friend-input"
          value={friend.player ?? ""}
          onChange={(e) => onValueChange(index, "player", e.target.value)}
        />
      </label>
    </div>
  );
};

const TentacleLines: React.FC = () => (
  <div className="tentacles-bg">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className={`tentacle-line line-${i + 1}`} />
    ))}
  </div>
);

const FriendsGrid: React.FC<FellowInvestigatorsSectionProps> = ({
  fellows,
  onValueChange,
}) => {
  const { t } = useTranslation();
  const layout: Array<number> = [0, 6, 3, 1, -1, 4, 2, 7, 5];

  return (
    <div className="friends-layout">
      <TentacleLines />
      {layout.map((cell, i) => (
        <div key={i} className="friend-grid-cell">
          {cell === -1 ? (
            <div className="moi-circle">{t("me")}</div>
          ) : (
            <FriendBox
              friend={fellows[cell]}
              index={cell}
              onValueChange={onValueChange}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const FellowInvestigatorsSection: React.FC<FellowInvestigatorsSectionProps> = ({
  fellows,
  onValueChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grow fellow-investigators-section">
      <SectionTitle>{t("friends")}</SectionTitle>
      <FriendsGrid fellows={fellows} onValueChange={onValueChange} />
    </div>
  );
};

export default FellowInvestigatorsSection;
