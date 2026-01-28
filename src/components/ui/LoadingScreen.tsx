import React from "react";
import { useTranslation } from "react-i18next";
import "./LoadingScreen.css";

const LoadingScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="loading-screen">
      <div className="logo scale-up">
        <span className="logo-top">{t("logo_top")}</span>
        <span className="logo-bottom">{t("logo_bottom")}</span>
      </div>
      <div className="loading-bar">
        <div className="loading-progress"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
