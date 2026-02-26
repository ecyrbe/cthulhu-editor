import React, { useCallback } from "react";
import { useAtom } from "jotai";
import { themeAtom } from "../../store/uiAtoms";
import moonIcon from "../../assets/half-moon.svg";
import sunIcon from "../../assets/sun-light.svg";
import "./ThemeToggle.css";

const THEME_TRANSITION_DURATION_MS = 600;

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

type Theme = "dark" | "light";

async function toggleThemeWithTransition(
  currentTheme: Theme,
  setTheme: (theme: Theme) => void,
  buttonElement: HTMLButtonElement,
): Promise<void> {
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  const isSwitchingToDark = nextTheme === "dark";
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const transitionDocument = document as ViewTransitionDocument;

  if (!transitionDocument.startViewTransition || prefersReducedMotion) {
    setTheme(nextTheme);
    return;
  }

  const buttonRect = buttonElement.getBoundingClientRect();
  const x = buttonRect.left + buttonRect.width / 2;
  const y = buttonRect.top + buttonRect.height / 2;
  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  let transition: ReturnType<
    NonNullable<ViewTransitionDocument["startViewTransition"]>
  >;

  try {
    transition = transitionDocument.startViewTransition(() => {
      setTheme(nextTheme);
    });
    await transition.ready;
  } catch {
    setTheme(nextTheme);
    return;
  }

  if (!isSwitchingToDark) {
    document.documentElement.classList.add("theme-transition-reverse");
  }

  try {
    const animation = document.documentElement.animate(
      {
        clipPath: isSwitchingToDark
          ? [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ]
          : [
              `circle(${maxRadius}px at ${x}px ${y}px)`,
              `circle(0px at ${x}px ${y}px)`,
            ],
      },
      {
        duration: THEME_TRANSITION_DURATION_MS,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
        pseudoElement: isSwitchingToDark
          ? "::view-transition-new(root)"
          : "::view-transition-old(root)",
      },
    );

    await Promise.all([
      transition.finished,
      animation.finished.catch(() => undefined),
    ]);
  } finally {
    document.documentElement.classList.remove("theme-transition-reverse");
  }
}

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      return toggleThemeWithTransition(theme, setTheme, event.currentTarget);
    },
    [setTheme, theme],
  );

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
