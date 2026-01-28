import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSelector.css";

interface LanguageSelectorProps {
  align?: "left" | "right";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  align = "right",
}) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "pt", label: "Português", flag: "🇵🇹" },
  ];

  const currentLang =
    languages.find(
      (l) => l.code === (i18n.resolvedLanguage || i18n.language),
    ) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="language-selector-container" ref={containerRef}>
      <button
        className="lang-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title={t("language")}
      >
        <span className="lang-flag">{currentLang.flag}</span>
        <span className="lang-label">{currentLang.label}</span>
        <span className={`chevron ${isOpen ? "open" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className={`lang-dropdown-menu align-${align}`} role="listbox">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option-btn ${currentLang.code === lang.code ? "active" : ""}`}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={currentLang.code === lang.code}
            >
              <span className="flag">{lang.flag}</span>
              <span className="label">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
