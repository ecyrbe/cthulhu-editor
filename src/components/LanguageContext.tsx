import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { translations, skillKeys } from "../constants/translations";
import type { Language } from "../types";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getSkillName: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const getSkillName = (key: string) => {
    return skillKeys[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, getSkillName }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
