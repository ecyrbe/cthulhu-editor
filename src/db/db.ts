import Dexie, { type Table } from "dexie";
import { type InvestigatorData, type Category } from "../types";

export class CthulhuDatabase extends Dexie {
  investigators!: Table<InvestigatorData>;
  categories!: Table<Category>;

  constructor() {
    super("CthulhuDatabase");
    this.version(1).stores({
      investigators: "++id, identity.name, identity.occupation", // Primary key and indexed fields
    });
    this.version(2).stores({
      investigators: "++id, category, identity.name, identity.occupation", // Primary key and indexed fields
    });
    this.version(3)
      .stores({
        investigators:
          "++id, categoryId, category, identity.name, identity.occupation",
        categories: "++id, &name",
      })
      .upgrade(async (tx) => {
        // Migration: Find all unique categories in investigators and move them to the categories table
        const investigators = await tx.table("investigators").toArray();
        const uniqueCategories = [
          ...new Set(
            investigators
              .map((i) => i.category)
              .filter((c): c is string => !!c && c.trim() !== ""),
          ),
        ];

        const categoryMap = new Map<string, number>();

        for (const catName of uniqueCategories) {
          const id = await tx.table("categories").add({ name: catName });
          categoryMap.set(catName, id);
        }

        // Update investigators with the new categoryId
        for (const inv of investigators) {
          if (inv.category && categoryMap.has(inv.category)) {
            await tx
              .table("investigators")
              .update(inv.id, { categoryId: categoryMap.get(inv.category) });
          }
        }
      });

    this.version(4).stores({
      categories: "++id, &name, color", // Added color to the model explicitly
    });
  }
}

export const db = new CthulhuDatabase();
