import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Theme = "dark" | "light";

export const themeAtom = atomWithStorage<Theme>("theme", "dark");
export const zoomLevelAtom = atom<number>(1);
export const printBlankValuesAtom = atom<boolean>(false);

export const zoomInAtom = atom(null, (get, set) => {
  set(zoomLevelAtom, Math.min(get(zoomLevelAtom) + 0.1, 3));
});

export const zoomOutAtom = atom(null, (get, set) => {
  set(zoomLevelAtom, Math.max(get(zoomLevelAtom) - 0.1, 0.2));
});

export const resetZoomAtom = atom(null, (_get, set) => {
  set(zoomLevelAtom, 1);
});

export const fitWidthAtom = atom(null, (_get, set) => {
  // We look for any page element to get the base width
  const page = document.querySelector(".page");
  if (page) {
    const scale = (window.innerWidth - 40) / (page as HTMLElement).offsetWidth;
    set(zoomLevelAtom, Math.min(scale, 3));
  }
});

export const fitHeightAtom = atom(null, (_get, set) => {
  const page = document.querySelector(".page");
  if (page) {
    const scale =
      (window.innerHeight - 80) / (page as HTMLElement).offsetHeight;
    set(zoomLevelAtom, Math.min(scale, 3));
  }
});
