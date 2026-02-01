import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import arrowUpIcon from "../../assets/arrow-up.svg";

const ScrollToTop: React.FC = () => {
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showScrollTop) return null;

  return (
    <button
      className="scroll-to-top"
      onClick={scrollToTop}
      aria-label={t("go_to_top", "Go to Top")}
    >
      <img src={arrowUpIcon} alt="" />
    </button>
  );
};

export default ScrollToTop;
