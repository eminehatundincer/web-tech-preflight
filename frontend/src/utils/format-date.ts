import type { CampusEvent } from "../types/campus-event";

// "2026-10-12" → "12 Ekim 2026"
export const formatDate = (e: CampusEvent) => new Date(`${e.date}T${e.time}`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
