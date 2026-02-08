/**
 * Saves a string to a file using the File System Access API if supported,
 * falling back to traditional download method otherwise.
 *
 * @param content The string content to save
 * @param fileName Suggested file name
 * @param mimeType MIME type of the content
 * @returns Promise resolving to true if saved, false if cancelled by user
 */
export async function saveToFile(
  content: string,
  fileName: string,
  mimeType: string = "application/json",
): Promise<boolean> {
  // Check if File System Access API is supported
  if ("showSaveFilePicker" in window) {
    try {
      const handle = await (
        window as unknown as {
          showSaveFilePicker: (options: {
            suggestedName?: string;
            types?: Array<{
              description?: string;
              accept: Record<string, string[]>;
            }>;
          }) => Promise<{
            createWritable: () => Promise<{
              write: (content: string) => Promise<void>;
              close: () => Promise<void>;
            }>;
          }>;
        }
      ).showSaveFilePicker({
        suggestedName: fileName,
        types: [
          {
            description: "JSON Files",
            accept: {
              [mimeType]: [".json"],
            },
          },
        ],
      });

      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
      return true;
    } catch (error: unknown) {
      // User cancelled or other error
      if (error instanceof Error && error.name === "AbortError") {
        return false;
      }
      console.error("Error saving file:", error);
      // Fallback to traditional method if something went wrong but wasn't a cancel
      return fallbackSave(content, fileName, mimeType);
    }
  }

  return fallbackSave(content, fileName, mimeType);
}

function fallbackSave(
  content: string,
  fileName: string,
  mimeType: string,
): boolean {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error("Fallback save failed:", error);
    return false;
  }
}
