import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/layout/Footer";
import LanguageSelector from "../components/layout/LanguageSelector";
import ThemeToggle from "../components/ui/ThemeToggle";
import Button from "../components/ui/Button";
import ScrollToTop from "../components/ui/ScrollToTop";
import githubLogo from "../assets/github.svg";
import diceIcon from "../assets/dices.png";
import registryIcon from "../assets/infinite-registry.png";
import summoningIcon from "../assets/summoning-circle.png";
import archivesIcon from "../assets/miskatonic-archive.png";
import tonguesIcon from "../assets/tongues-of-the-old-ones.png";
import storageIcon from "../assets/forbidden-knowledge.png";
import cartographyImage from "../assets/arkham-carthography.png";
import "./LandingPage.css";
import { toCryptic } from "../utils/cryptic";

const features = [
  {
    id: "sheet",
    icon: diceIcon,
    title: "landing_feature_sheet_title",
    desc: "landing_feature_sheet_desc",
  },
  {
    id: "multichar",
    icon: registryIcon,
    title: "landing_feature_multichar_title",
    desc: "landing_feature_multichar_desc",
  },
  {
    id: "storage",
    icon: storageIcon,
    title: "landing_feature_storage_title",
    desc: "landing_feature_storage_desc",
  },
  {
    id: "print",
    icon: summoningIcon,
    title: "landing_feature_print_title",
    desc: "landing_feature_print_desc",
  },
  {
    id: "offline",
    icon: archivesIcon,
    title: "landing_feature_offline_title",
    desc: "landing_feature_offline_desc",
  },
  {
    id: "i18n",
    icon: tonguesIcon,
    title: "landing_feature_i18n_title",
    desc: "landing_feature_i18n_desc",
  },
];

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const setReveal = (id: string, isRevealed: boolean) => {
    setRevealed((prev) => ({ ...prev, [id]: isRevealed }));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page-container">
      <header className="landing-header">
        <div className="logo">
          <span className="logo-top">{t("logo_top")}</span>
          <span className="logo-bottom">{t("logo_bottom")}</span>
        </div>
        <div className="header-actions">
          <ThemeToggle />
          <LanguageSelector align="center" />
          <a
            href="https://github.com/ecyrbe/cthulhu-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            title={t("github_repository")}
          >
            <img src={githubLogo} alt="GitHub" />
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h1>{t("landing_title")}</h1>
            <p className="subtitle">{t("landing_subtitle")}</p>
            <div className="hero-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/registry")}
              >
                {t("get_started")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("entries")}
              >
                {t("explore_features")}
              </Button>
            </div>
          </div>
          <div className="hero-overlay"></div>
        </section>

        <section id="entries" className="entries-section">
          <h2>{t("landing_entries_title")}</h2>
          <div className="entries-grid">
            <div
              className="feature-card revealed"
              role="button"
              tabIndex={0}
              onClick={() => navigate("/registry")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate("/registry");
                }
              }}
            >
              <div className="feature-icon">
                <img src={registryIcon} alt={t("launch_registry")} />
              </div>
              <div className="feature-card-content">
                <h3>{t("launch_registry")}</h3>
                <p>{t("landing_feature_multichar_desc")}</p>
              </div>
            </div>
            <div
              className="feature-card revealed"
              role="button"
              tabIndex={0}
              onClick={() => navigate("/cartography")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate("/cartography");
                }
              }}
            >
              <div className="feature-icon">
                <img
                  src={cartographyImage}
                  alt={t("landing_feature_cartography_title")}
                />
              </div>
              <div className="feature-card-content">
                <h3>{t("landing_feature_cartography_title")}</h3>
                <p>{t("landing_feature_cartography_desc")}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2>{t("landing_prepared_title")}</h2>
          <div className="features-grid">
            {features.map((feature) => {
              const isRevealed = revealed[feature.id];
              const title = t(feature.title);
              const desc = t(feature.desc);

              return (
                <div
                  key={feature.id}
                  className={`feature-card ${isRevealed ? "revealed" : ""}`}
                  onMouseEnter={() => setReveal(feature.id, true)}
                  onMouseLeave={() => setReveal(feature.id, false)}
                >
                  <div className="feature-icon">
                    <img src={feature.icon} alt={feature.id} />
                  </div>
                  <div className="feature-card-content">
                    <h3>{isRevealed ? title : toCryptic(title)}</h3>
                    <p>{isRevealed ? desc : toCryptic(desc)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-box">
            <h2>{t("landing_cta_title")}</h2>
            <p>{t("landing_cta_subtitle")}</p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/registry")}
            >
              {t("launch_registry")}
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LandingPage;
