import React from "react";
import { useTranslation } from "react-i18next";
import { StatBox } from "../ui/StatBox";
import { SectionTitle } from "../ui/SectionTitle";
import type { Skill } from "../../types";

interface SkillsSectionProps {
  skills: Skill[];
  onSkillChange: (
    index: number,
    field: keyof Skill,
    value: string | number | boolean,
  ) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onSkillChange,
}) => {
  const { t } = useTranslation();

  const sortedWithIndex = skills
    .map((skill, index) => ({ skill, index }))
    .sort((a, b) => {
      const nameA = a.skill.isCustom
        ? a.skill.name || ""
        : t(`skills:${a.skill.key}`);
      const nameB = b.skill.isCustom
        ? b.skill.name || ""
        : t(`skills:${b.skill.key}`);

      if (!nameA && nameB) return 1;
      if (nameA && !nameB) return -1;

      return nameA.localeCompare(nameB, undefined, { sensitivity: "base" });
    });

  const colSize = Math.ceil(sortedWithIndex.length / 3);
  const columns = [
    sortedWithIndex.slice(0, colSize),
    sortedWithIndex.slice(colSize, colSize * 2),
    sortedWithIndex.slice(colSize * 2),
  ];

  return (
    <div className="section-box skills-section grow">
      <SectionTitle>{t("skills_title")}</SectionTitle>
      <div className="row">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="skills-column">
            {col.map(({ skill, index }) => {
              const skillName = skill.isCustom
                ? skill.name || t("custom_skill")
                : t(`skills:${skill.key}`);

              return (
                <div key={index} className="skill-row">
                  <button
                    className={`skill-check ${skill.checked ? "checked" : ""}`}
                    onClick={() =>
                      onSkillChange(index, "checked", !skill.checked)
                    }
                    aria-label={`${t("check")} ${skillName}`}
                    aria-pressed={skill.checked}
                  />
                  <div className="skill-name">
                    {skill.isCustom ? (
                      <input
                        type="text"
                        className="custom-name-input"
                        value={skill.name || ""}
                        onChange={(e) =>
                          onSkillChange(index, "name", e.target.value)
                        }
                        aria-label={t("skill_name")}
                      />
                    ) : (
                      <>
                        {t(`skills:${skill.key}`)}
                        <span className="skill-base">
                          (
                          {typeof skill.base === "number"
                            ? `${skill.base}%`
                            : skill.base}
                          )
                        </span>
                      </>
                    )}
                  </div>
                  <div className="skill-box-wrapper">
                    <StatBox
                      value={skill.current}
                      onChange={(val) => onSkillChange(index, "current", val)}
                      readOnly={
                        skill.key === "dodge" || skill.key === "mother_tongue"
                      }
                      ariaLabel={`${skillName} ${t("value")}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
