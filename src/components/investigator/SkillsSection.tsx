import React from "react";
import { useTranslation } from "react-i18next";
import { SkillStatBox } from "../ui/SkillStatBox";
import { SectionTitle } from "../ui/SectionTitle";
import { DebouncedInput } from "../ui/DebouncedInput";
import Tooltip from "../ui/Tooltip";
import type { Skill } from "../../types";

interface SkillsSectionProps {
  skills: Skill[];
  onSkillChange: (
    index: number,
    field: string,
    value: string | number | boolean,
  ) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = React.memo(
  ({ skills, onSkillChange }) => {
    const { t } = useTranslation();

    return (
      <div className="section-box skills-section grow">
        <SectionTitle>{t("skills_title")}</SectionTitle>
        <div className="skills-container">
          {skills.map((skill, index) => {
            const skillName =
              skill.type === "custom"
                ? skill.name || t("custom_skill")
                : t(`skills:${skill.key}`);
            const skillDescription =
              skill.type === "custom"
                ? ""
                : t(`skills:descriptions.${skill.key}`, { defaultValue: "" });

            return (
              <div key={index} className="skill-row">
                {skill.type !== "static" ? (
                  <button
                    className={`skill-check ${skill.checked ? "checked" : ""}`}
                    onClick={() =>
                      onSkillChange(index, "checked", !skill.checked)
                    }
                    aria-label={`${t("check")} ${skillName}`}
                    aria-pressed={skill.checked}
                  />
                ) : (
                  <div className="skill-check-spacer" />
                )}
                {skill.type === "custom" ? (
                  <div className="skill-name">
                    <DebouncedInput
                      type="text"
                      className="custom-name-input"
                      value={skill.name || ""}
                      onValueChange={(val) => onSkillChange(index, "name", val)}
                      aria-label={t("skill_name")}
                    />
                  </div>
                ) : (
                  <Tooltip
                    className="skill-name"
                    content={skillDescription}
                    ariaLabel={skillName}
                    maxWidth={280}
                  >
                    {t(`skills:${skill.key}`)}
                    <span className="skill-base">
                      (
                      {typeof skill.base === "number"
                        ? `${skill.base}%`
                        : skill.base}
                      )
                    </span>
                  </Tooltip>
                )}
                {skill.type !== "static" && (
                  <div className="skill-box-wrapper">
                    <SkillStatBox
                      value={skill.current}
                      onChange={(val) => onSkillChange(index, "current", val)}
                      readOnly={
                        (skill.type === "standard" && skill.key === "dodge") ||
                        (skill.type === "custom" &&
                          skill.id === "skill-mother_tongue-0")
                      }
                      ariaLabel={`${skillName} ${t("value")}`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

export default SkillsSection;
