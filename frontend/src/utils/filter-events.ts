import type { CampusEvent, Category } from "../types/campus-event";

// Başlık veya açıklamada metin ara (Türkçe karakterlere duyarlı)
export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  return list.filter((e) =>
    `${e.title} ${e.description}`.toLocaleLowerCase("tr-TR").includes(q),
  );
}

// "" ise hepsi, değilse sadece o kategoridekiler
export function filterByCategory(
  list: CampusEvent[],
  category: Category | "",
): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

// Tek etkinlik ya da undefined
export function findEventById(
  list: CampusEvent[],
  id: string,
): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}
