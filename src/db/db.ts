import Dexie, { type Table } from "dexie";
import { type InvestigatorData } from "../types";

export class CthulhuDatabase extends Dexie {
  investigators!: Table<InvestigatorData>;

  constructor() {
    super("CthulhuDatabase");
    this.version(1).stores({
      investigators: "++id, identity.name, identity.occupation", // Primary key and indexed fields
    });
  }
}

export const db = new CthulhuDatabase();
