import React from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const disclaimer = t("footer_disclaimer");
  const parts = disclaimer.split("%URL%");

  return (
    <footer className="app-footer">
      <p>
        {parts[0]}
        <a
          href="https://www.chaosium.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.chaosium.com
        </a>
        {parts[1]}
      </p>
    </footer>
  );
};

export default Footer;
