import React from "react";
import { useTranslation } from "react-i18next";

const WeaponTable: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="weapons-section-content">
      <div className="section-title">{t("weapons")}</div>
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
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeaponTable;
