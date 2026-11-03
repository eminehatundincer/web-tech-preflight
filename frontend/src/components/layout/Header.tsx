import { matchPath, useLocation } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { findEventById } from "../../utils/filter-events";

// Sabit adreslerin başlığı ve (varsa) alt yazısı
const pages: Record<string, { title: string; text?: string }> = {
  "/": { title: "Kampüs Etkinlikleri", text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." },
  "/events": { title: "Tüm Etkinlikler", text: "Ekim ayında kampüste düzenlenen etkinlikler." },
  "/login": { title: "Giriş Yap" },
  "/register": { title: "Kayıt Ol" },
  "/forgot-password": { title: "Şifremi Unuttum" },
  "/admin": { title: "Etkinlik Yönetimi" },
  "/admin/new": { title: "Etkinlik Ekle" },
};

// Başlık props'la gelmez; hangi sayfanın açık olduğunu adres söyler
function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();

  const detail = matchPath("/events/:id", pathname);
  const edit = matchPath("/admin/:id/edit", pathname);

  let page = pages[pathname] ?? { title: "Sayfa bulunamadı" };
  if (detail) {
    const event = findEventById(events, detail.params.id ?? "");
    page = { title: event ? event.title : "Sayfa bulunamadı" };
  }
  if (edit) {
    const event = findEventById(events, edit.params.id ?? "");
    page = { title: event ? "Etkinlik Güncelle" : "Sayfa bulunamadı" };
  }

  return (
    <header className="site-baslik">
      <h1>{page.title}</h1>
      {page.text && <p>{page.text}</p>}
    </header>
  );
}

export default Header;
