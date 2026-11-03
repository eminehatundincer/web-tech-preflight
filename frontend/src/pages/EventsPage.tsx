import { useState } from "react";
import type { Category } from "../types/campus-event";
import { useEvents } from "../context/EventsContext";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

function EventsPage() {
  const { events } = useEvents();
  // Arama ve kategori state'leri bu sayfanın içinde
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Kategori seçenekleri veriden üretilir (her kategori bir kez)
  const categories = [...new Set(events.map((e) => e.category))];
  // Filtreli liste state değil, her çizimde hesaplanır
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <h2 className="bolum-baslik">Etkinlikler</h2>
      <EventFilter
        searchText={searchText}
        category={category}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />
      {filtered.length > 0 && <p>{filtered.length} etkinlik listeleniyor.</p>}
      <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
    </>
  );
}

export default EventsPage;
