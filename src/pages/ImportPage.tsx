import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { InvestigatorDataSchema, type InvestigatorData } from "../types";
import { db } from "../db/db";
import LoadingScreen from "../components/ui/LoadingScreen";

const ImportPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { url: importUrl } = useParams<{ url: string }>();

  useEffect(() => {
    if (!importUrl) {
      toast.error(t("toast_import_error", "No URL provided for import"));
      navigate("/", { replace: true });
      return;
    }

    const handleUrlImport = async (url: string) => {
      try {
        const decodedUrl = decodeURIComponent(url);
        const response = await fetch(decodedUrl);
        if (!response.ok) throw new Error("Failed to fetch");
        const json = await response.json();
        const result = InvestigatorDataSchema.safeParse(json);

        if (!result.success) {
          toast.error(t("toast_import_error", "Failed to import"));
          navigate("/", { replace: true });
          return;
        }

        const dataToSave = { ...result.data };
        delete dataToSave.id;
        const newId = await db.investigators.add(
          dataToSave as InvestigatorData,
        );

        navigate(`/edit/${newId}`, { replace: true });
      } catch (error) {
        console.error("URL Import failed:", error);
        toast.error(t("toast_import_error", "Failed to import"));
        navigate("/", { replace: true });
      }
    };

    handleUrlImport(importUrl);
  }, [importUrl, navigate, t]);

  return <LoadingScreen />;
};

export default ImportPage;
