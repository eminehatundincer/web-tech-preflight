import { events } from "./data.js";

// Sayfadaki boş container'ı bul
const list = document.querySelector("#etkinlik-listesi");

// "2026-10-12" → "12 Ekim 2026"
function tarihYaz(event) {
  const tarih = new Date(`${event.date}T${event.time}`);
  return tarih.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Bir etkinlikten kart (HTML metni) üret
function createCard(event) {
  return `
    <article>
      <h3>${event.title}</h3>
      <p><strong>${event.category}</strong></p>
      <p>Tarih: <time datetime="${event.date}T${event.time}">${tarihYaz(event)}, ${event.time}</time></p>
      <p>Yer: ${event.location}</p>
      <p>Kontenjan: ${event.capacity} kişi</p>
      <p>${event.description}</p>
      <a href="etkinlik-detay.html?id=${event.id}">Detayları gör →</a>
    </article>
  `;
}

// Verilen dizideki her etkinlik için kart üretip container'a yaz
function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

// Ana sayfada data-limit="2" var → tarihe göre sırala, ilk 2'yi göster
// Etkinlikler sayfasında yok → hepsini göster
if (list.dataset.limit) {
  const yaklasan = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);
}
// ---------- Adım 7: Arama + kategori filtresi ----------
const filtreFormu = document.querySelector("#filtre-formu");
const arama = document.querySelector("#arama");
const kategoriFiltre = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

// Filtre formu sadece etkinlikler.html'de var; ana sayfada bu blok çalışmaz
if (filtreFormu) {
  // 1) Kategori seçeneklerini veriden üret (her kategori bir kez)
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriler.forEach((kategori) => {
    kategoriFiltre.innerHTML += `<option value="${kategori}">${kategori}</option>`;
  });

  // 2) Filtreleme fonksiyonu
  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const secilenKategori = kategoriFiltre.value;

    const sonuc = events.filter((e) => {
      const metin = `${e.title} ${e.category} ${e.description}`.toLocaleLowerCase("tr-TR");
      const metinUyuyor = metin.includes(aranan);
      const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    if (sonuc.length === 0) {
      sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    } else {
      sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
    }
  }

  // 3) Yazdıkça ve kategori değişince filtrele
  arama.addEventListener("input", filtrele);
  kategoriFiltre.addEventListener("change", filtrele);

  // 4) Enter'a basınca sayfa yenilenmesin
  filtreFormu.addEventListener("submit", (e) => e.preventDefault());

  // 5) Sayfa ilk açıldığında "6 etkinlik listeleniyor." yazsın
  filtrele();
}