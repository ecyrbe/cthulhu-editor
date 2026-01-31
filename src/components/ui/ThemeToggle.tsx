import React from "react";
import { useAtom } from "jotai";
import { themeAtom } from "../../store/uiAtoms";
import moonIcon from "../../assets/half-moon.svg";
import sunIcon from "../../assets/sun-light.svg";
import "./ThemeToggle.css";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={theme === "dark" ? "Light Mode" : "Dark Mode"}
      aria-label={
        theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
      }
    >
      <img
        src={theme === "dark" ? sunIcon : moonIcon}
        alt={theme === "dark" ? "Sun" : "Moon"}
        width="20"
        height="20"
      />
    </button>
  );
};

export default ThemeToggle;
