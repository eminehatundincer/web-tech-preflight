import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

// Kategori seçenekleri veriden üretilir (her kategori bir kez)
const categories = [...new Set(events.map((e) => e.category))];

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Sayfa değiştiren tek fonksiyon
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Ana sayfa: tarihi en yakın 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // Etkinlikler sayfası: filtreli liste state değil, her çizimde hesaplanır
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  // Detay ve güncelleme: seçili etkinlik
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Sayfaya göre başlık
  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Etkinlikler",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };
  const title = titles[page];

  // Sayfaya göre alt yazı (sadece ana sayfa ve etkinlikler)
  const texts: Partial<Record<PageName, string>> = {
    home: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
    events: "Ekim ayında kampüste düzenlenen etkinlikleri inceleyin.",
  };

  // Başlık değişince sekme adı da değişsin
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <>
      <Header title={title} text={texts[page]} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <>
            <section>
              <h2>Hoş Geldiniz</h2>
              <p>
                Kampüs Etkinlikleri uygulaması, üniversitemizde düzenlenen
                seminer, atölye ve konferans gibi etkinlikleri takip etmenizi sağlar.
              </p>
            </section>

            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <p><a href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>Tüm etkinlikleri gör →</a></p>
          </>
        )}

        {page === "events" && (
          <>
            <h2>Tüm Etkinlikler</h2>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && <p>{filtered.length} etkinlik listeleniyor.</p>}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />

            <h2>Ayın Programı</h2>
            <table>
              <caption>Ayın Programı</caption>
              <tbody>
                <tr>
                  <th>Tarih</th>
                  <th>Etkinlik</th>
                  <th>Yer</th>
                </tr>
                <tr>
                  <td><time dateTime="2026-10-12">12 Ekim</time></td>
                  <td>Kariyer Günleri</td>
                  <td>A Blok</td>
                </tr>
                <tr>
                  <td><time dateTime="2026-10-20">20 Ekim</time></td>
                  <td>Robotik Atölyesi</td>
                  <td>Lab 2</td>
                </tr>
                <tr>
                  <td><time dateTime="2026-10-27">27 Ekim</time></td>
                  <td>Siber Güvenlik</td>
                  <td>B Blok</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <p className="hata-kutusu">Etkinlik seçilmedi. Listeden bir etkinlik seçin.</p>
            <a className="buton" href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>← Listeye dön</a>
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
