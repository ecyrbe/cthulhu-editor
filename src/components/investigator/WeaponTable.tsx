import React from "react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../ui/SectionTitle";
import type { Weapon } from "../../types";

interface WeaponTableProps {
  weapons: Weapon[];
  onWeaponChange: (index: number, field: keyof Weapon, value: string) => void;
}

const WeaponTable: React.FC<WeaponTableProps> = ({
  weapons,
  onWeaponChange,
}) => {
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
          {weapons.map((weapon, i) => (
            <tr key={i}>
              <td>
                <input
                  type="text"
                  value={weapon.name}
                  onChange={(e) => onWeaponChange(i, "name", e.target.value)}
                  aria-label={`${t("weapon_name")} ${i + 1}`}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={weapon.regular}
                  onChange={(e) => onWeaponChange(i, "regular", e.target.value)}
                  aria-label={`${t("reg")} ${i + 1}`}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={weapon.hard}
                  onChange={(e) => onWeaponChange(i, "hard", e.target.value)}
                  aria-label={`${t("hard")} ${i + 1}`}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={weapon.extreme}
                  onChange={(e) => onWeaponChange(i, "extreme", e.target.value)}
                  aria-label={`${t("ext")} ${i + 1}`}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={weapon.damage}
                  onChange={(e) => onWeaponChange(i, "damage", e.target.value)}
                  aria-label={`${t("damage")} ${i + 1}`}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={weapon.range}
                  onChange={(e) => onWeaponChange(i, "range", e.target.value)}
                  aria-label={`${t("range")} ${i + 1}`}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={weapon.attacks}
                  onChange={(e) => onWeaponChange(i, "attacks", e.target.value)}
                  aria-label={`${t("attacks")} ${i + 1}`}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={weapon.ammo}
                  onChange={(e) => onWeaponChange(i, "ammo", e.target.value)}
                  aria-label={`${t("ammo")} ${i + 1}`}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={weapon.malfunction}
                  onChange={(e) =>
                    onWeaponChange(i, "malfunction", e.target.value)
                  }
                  aria-label={`${t("malf")} ${i + 1}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeaponTable;
