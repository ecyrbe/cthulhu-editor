import React from "react";
import { useTranslation } from "react-i18next";
import type { InvestigatorData } from "../../types";

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

  const leftFellows = fellows.slice(0, 3);
  const rightFellows = fellows.slice(3, 6);

  return (
    <div className="grow fellow-investigators-section">
      <div className="section-title">{t("friends")}</div>
      <div className="friends-layout">
        <div className="friend-col">
          {leftFellows.map((friend, i) => (
            <div key={i} className="friend-box">
              <div className="field-row">
                <span className="field-label">{t("char_name")}:</span>
                <input
                  className="friend-input"
                  value={friend.name}
                  onChange={(e) => onValueChange(i, "name", e.target.value)}
                />
              </div>
              <div className="field-row">
                <span className="field-label">{t("char_player")}:</span>
                <input
                  className="friend-input"
                  value={friend.player}
                  onChange={(e) => onValueChange(i, "player", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="friend-center">
          <div className="tentacles-bg">
            <div className="tentacle-line line-1" />
            <div className="tentacle-line line-2" />
            <div className="tentacle-line line-3" />
            <div className="tentacle-line line-4" />
            <div className="tentacle-line line-5" />
            <div className="tentacle-line line-6" />
          </div>
          <div className="moi-circle">{t("me")}</div>
        </div>

        <div className="friend-col">
          {rightFellows.map((friend, i) => {
            const index = i + 3;
            return (
              <div key={index} className="friend-box">
                <div className="field-row">
                  <span className="field-label">{t("char_name")}:</span>
                  <input
                    className="friend-input"
                    value={friend.name}
                    onChange={(e) =>
                      onValueChange(index, "name", e.target.value)
                    }
                  />
                </div>
                <div className="field-row">
                  <span className="field-label">{t("char_player")}:</span>
                  <input
                    className="friend-input"
                    value={friend.player}
                    onChange={(e) =>
                      onValueChange(index, "player", e.target.value)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FellowInvestigatorsSection;
