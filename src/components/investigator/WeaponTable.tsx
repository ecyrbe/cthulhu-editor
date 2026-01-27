import React from "react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../ui/SectionTitle";
import { DebouncedInput } from "../ui/DebouncedInput";
import type { Weapon } from "../../types";

interface WeaponTableProps {
  weapons: Weapon[];
  onWeaponChange: (index: number, field: keyof Weapon, value: string) => void;
}

const WeaponTable: React.FC<WeaponTableProps> = React.memo(
  ({ weapons, onWeaponChange }) => {
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
                  <DebouncedInput
                    type="text"
                    value={weapon.name}
                    onValueChange={(val) => onWeaponChange(i, "name", val)}
                    aria-label={`${t("weapon_name")} ${i + 1}`}
                  />
                </td>
                <td>
                  <DebouncedInput
                    type="text"
                    value={weapon.regular}
                    onValueChange={(val) => onWeaponChange(i, "regular", val)}
                    aria-label={`${t("reg")} ${i + 1}`}
                  />
                </td>
                <td>
                  <DebouncedInput
                    type="text"
                    value={weapon.hard}
                    onValueChange={(val) => onWeaponChange(i, "hard", val)}
                    aria-label={`${t("hard")} ${i + 1}`}
                  />
                </td>
                <td>
                  <DebouncedInput
                    type="text"
                    value={weapon.extreme}
                    onValueChange={(val) => onWeaponChange(i, "extreme", val)}
                    aria-label={`${t("ext")} ${i + 1}`}
                  />
                </td>
                <td>
                  <DebouncedInput
                    type="text"
                    value={weapon.damage}
                    onValueChange={(val) => onWeaponChange(i, "damage", val)}
                    aria-label={`${t("damage")} ${i + 1}`}
                  />
                </td>
                <td>
                  <DebouncedInput
                    type="text"
                    value={weapon.range}
                    onValueChange={(val) => onWeaponChange(i, "range", val)}
                    aria-label={`${t("range")} ${i + 1}`}
                  />
                </td>
                <td>
                  <DebouncedInput
                    type="text"
                    value={weapon.attacks}
                    onValueChange={(val) => onWeaponChange(i, "attacks", val)}
                    aria-label={`${t("attacks")} ${i + 1}`}
                  />
                </td>
                <td>
                  <DebouncedInput
                    type="text"
                    value={weapon.ammo}
                    onValueChange={(val) => onWeaponChange(i, "ammo", val)}
                    aria-label={`${t("ammo")} ${i + 1}`}
                  />
                </td>
                <td>
                  <DebouncedInput
                    type="text"
                    value={weapon.malfunction}
                    onValueChange={(val) =>
                      onWeaponChange(i, "malfunction", val)
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
  },
);

export default WeaponTable;
