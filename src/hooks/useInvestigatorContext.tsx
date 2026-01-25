import React from "react";
import { useInvestigator } from "./useInvestigator";

export type InvestigatorContextValue = ReturnType<typeof useInvestigator> & {
  zoom: number;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleFitWidth: () => void;
  handleFitHeight: () => void;
  handleResetZoom: () => void;
};

export const InvestigatorContext =
  React.createContext<InvestigatorContextValue | null>(null);

export const useInvestigatorContext = () => {
  const context = React.useContext(InvestigatorContext);
  if (!context)
    throw new Error(
      "useInvestigatorContext must be used within InvestigatorProvider",
    );
  return context;
};
