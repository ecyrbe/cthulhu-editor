import React from "react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../ui/SectionTitle";

const WeaponTable: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="weapons-section-content">
      <SectionTitle>{t("weapons")}</SectionTitle>
      <table className="weapon-table">
        <thead>
          <tr>
            <th className="w-name">{t("weapon_name")}</th>
            <th className="w-reg">{t("reg")}</th>
            <th className="w-hard">{t("hard")}</th>
            <th className="w-ext">{t("ext")}</th>
            <th className="w-dmg">{t("damage")}</th>
            <th className="w-rng">{t("range")}</th>
            <th className="w-atk">{t("attacks")}</th>
            <th className="w-ammo">{t("ammo")}</th>
            <th className="w-malf">{t("malf")}</th>
          </tr>
        </thead>
        <tbody>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <tr key={i}>
                <td>
                  <input type="text" aria-label={`${t("weapon_name")} ${i + 1}`} />
                </td>
                <td>
                  <input type="text" aria-label={`${t("reg")} ${i + 1}`} />
                </td>
                <td>
                  <input type="text" aria-label={`${t("hard")} ${i + 1}`} />
                </td>
                <td>
                  <input type="text" aria-label={`${t("ext")} ${i + 1}`} />
                </td>
                <td>
                  <input type="text" aria-label={`${t("damage")} ${i + 1}`} />
                </td>
                <td>
                  <input type="text" aria-label={`${t("range")} ${i + 1}`} />
                </td>
                <td>
                  <input type="text" aria-label={`${t("attacks")} ${i + 1}`} />
                </td>
                <td>
                  <input type="text" aria-label={`${t("ammo")} ${i + 1}`} />
                </td>
                <td>
                  <input type="text" aria-label={`${t("malf")} ${i + 1}`} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeaponTable;
