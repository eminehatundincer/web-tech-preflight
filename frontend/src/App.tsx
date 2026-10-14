import "./App.css";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

// Menü öğeleri: map ile çizilir
const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

// Kategori seçenekleri veriden üretilir (her kategori bir kez)
const categories = [...new Set(events.map((e) => e.category))];

// "2026-10-12" → "12 Ekim 2026"
const formatDate = (e: CampusEvent) => new Date(`${e.date}T${e.time}`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

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

  // Link tıklanınca sayfa yenilenmesin, state değişsin
  function link(e: MouseEvent, next: PageName, id: string | null = null) {
    e.preventDefault();
    go(next, id);
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

  // Başlık değişince sekme adı da değişsin
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  // Bir etkinlikten kart üret (ana sayfa ve etkinlikler sayfası ortak)
  function renderCard(event: CampusEvent) {
    return (
      <article key={event.id}>
        <h3>{event.title}</h3>
        <p><strong>{event.category}</strong></p>
        <p>Tarih: <time dateTime={`${event.date}T${event.time}`}>{formatDate(event)}, {event.time}</time></p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a href="#" onClick={(e) => link(e, "detail", event.id)}>Detayları gör →</a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
        <nav>
          {menu.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => link(e, item.page)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

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
            <section className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <p><a href="#" onClick={(e) => link(e, "events")}>Tüm etkinlikleri gör →</a></p>
          </>
        )}

        {page === "events" && (
          <>
            <h2>Tüm Etkinlikler</h2>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  name="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  name="kategori"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </form>
            <p>
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>

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
            <a className="buton" href="#" onClick={(e) => link(e, "events")}>← Listeye dön</a>
          </>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            <div className="detay-ust">
              {selected.image && (
                <figure>
                  <img src={selected.image} alt={`${selected.title} afişi`} />
                  <figcaption>{selected.title} afişi</figcaption>
                </figure>
              )}
              <section className="kunye">
                <h2>Etkinlik Künyesi</h2>
                <dl>
                  <dt>Tarih</dt>
                  <dd><time dateTime={`${selected.date}T${selected.time}`}>{formatDate(selected)}, {selected.time}</time></dd>
                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>
                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>
                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>
              </section>
            </div>

            <h2>Açıklama</h2>
            <p>{selected.description}</p>

            <p>
              <a className="buton" href="#" onClick={(e) => link(e, "events")}>← Listeye dön</a>
              <a className="buton" href="#" onClick={(e) => link(e, "update", selected.id)}>Bu etkinliği güncelle</a>
            </p>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

            <form className="form" noValidate onSubmit={(e) => e.preventDefault()}>
              <p>
                <label htmlFor="ad">Etkinlik Adı *</label><br />
                <input type="text" id="ad" name="ad" placeholder="Örn. Kariyer Günleri" required />
                <span id="ad-hata" className="hata"></span>
              </p>

              <p>
                <label htmlFor="kategori">Kategori *</label><br />
                <select id="kategori" name="kategori" required>
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                </select>
                <span id="kategori-hata" className="hata"></span>
              </p>

              <p>
                <label htmlFor="tarih">Tarih *</label><br />
                <input type="date" id="tarih" name="tarih" required />
                <span id="tarih-hata" className="hata"></span>
              </p>

              <p>
                <label htmlFor="saat">Saat *</label><br />
                <input type="time" id="saat" name="saat" required />
                <span id="saat-hata" className="hata"></span>
              </p>

              <p>
                <label htmlFor="yer">Yer *</label><br />
                <input type="text" id="yer" name="yer" placeholder="Örn. A Blok Konferans Salonu" required />
                <span id="yer-hata" className="hata"></span>
              </p>

              <p>
                <label htmlFor="kontenjan">Kontenjan</label><br />
                <input type="number" id="kontenjan" name="kontenjan" min={1} max={1000} />
                <span id="kontenjan-hata" className="hata"></span>
              </p>

              <p>
                <label htmlFor="aciklama">Açıklama</label><br />
                <textarea id="aciklama" name="aciklama" rows={4} cols={40} />
              </p>

              <p>
                <button type="submit">{page === "add" ? "Kaydet" : "Güncelle"}</button>
              </p>
            </form>
          </>
        )}
      </main>

      <footer>
        <p>Emine Hatun Dinçer · 2416501080 · 2026</p>
      </footer>
    </>
  );
}

export default App;
