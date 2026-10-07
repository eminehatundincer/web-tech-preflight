import { events } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("header h1");

// 1) Adres çubuğundaki id'yi oku: ?id=event-3 → "event-3"
const id = new URLSearchParams(location.search).get("id");

// 2) Bu id'ye sahip etkinliği bul (yoksa undefined döner)
const event = events.find((e) => e.id === id);

function tarihYaz(e) {
  return new Date(`${e.date}T${e.time}`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// 3) Önce kontrol: bulunamadıysa hata kutusu göster
if (!event) {
  document.title = "Etkinlik bulunamadı";
  baslik.textContent = "Etkinlik bulunamadı";

  container.innerHTML = `
    <p class="hata-kutusu"></p>
    <a class="buton" href="etkinlikler.html">← Listeye dön</a>
  `;
  container.querySelector(".hata-kutusu").textContent = id
    ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
    : "Etkinlik seçilmedi. Listeden bir etkinlik seçin.";
} else {
  // 4) Bulunduysa: sekme adı, başlık ve künyeyi doldur
  document.title = event.title;
  baslik.textContent = event.title;

  const afis = event.image
    ? `<figure>
         <img src="${event.image}" alt="${event.title} afişi">
         <figcaption>${event.title} afişi</figcaption>
       </figure>`
    : "";

  container.innerHTML = `
    <div class="detay-ust">
      ${afis}
      <section class="kunye">
        <h2>Etkinlik Künyesi</h2>
        <dl>
          <dt>Tarih</dt>
          <dd><time datetime="${event.date}T${event.time}">${tarihYaz(event)}, ${event.time}</time></dd>
          <dt>Yer</dt>
          <dd>${event.location}</dd>
          <dt>Kategori</dt>
          <dd>${event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>${event.capacity} kişi</dd>
        </dl>
      </section>
    </div>

    <h2>Açıklama</h2>
    <p>${event.description}</p>

    <p>
      <a class="buton" href="etkinlikler.html">← Listeye dön</a>
      <a class="buton" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
    </p>
  `;
}