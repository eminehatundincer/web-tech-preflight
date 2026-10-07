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

render(events);