import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/layout/Footer";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="landing-page-container">
      <header className="landing-header">
        <div className="logo">
          <span className="logo-top">{t("logo_top")}</span>
          <span className="logo-bottom">{t("logo_bottom")}</span>
        </div>
        <button className="nav-cta" onClick={() => navigate("/manager")}>
          {t("launch_manager")}
        </button>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h1>{t("landing_title")}</h1>
            <p className="subtitle">{t("landing_subtitle")}</p>
            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => navigate("/manager")}
              >
                {t("get_started")}
              </button>
              <a href="#features" className="secondary-button">
                {t("explore_features")}
              </a>
            </div>
          </div>
          <div className="hero-overlay"></div>
        </section>

        <section id="features" className="features-section">
          <h2>{t("landing_prepared_title")}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📁</div>
              <h3>{t("landing_feature_storage_title")}</h3>
              <p>{t("landing_feature_storage_desc")}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🕵️‍♂️</div>
              <h3>{t("landing_feature_multichar_title")}</h3>
              <p>{t("landing_feature_multichar_desc")}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3>{t("landing_feature_print_title")}</h3>
              <p>{t("landing_feature_print_desc")}</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-box">
            <h2>{t("landing_cta_title")}</h2>
            <p>{t("landing_cta_subtitle")}</p>
            <button
              className="large-button"
              onClick={() => navigate("/manager")}
            >
              {t("launch_manager")}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
