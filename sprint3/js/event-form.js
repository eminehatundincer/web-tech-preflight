import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");

// Kaydet'e basılınca
form.addEventListener("submit", (e) => {
  // Sayfanın yenilenmesini engelle
  e.preventDefault();

  // Formdaki tüm değerleri oku
  const fd = new FormData(form);

  // data.js'teki alan adlarıyla (İngilizce) bir nesne oluştur
  const kontenjan = fd.get("kontenjan");
  const data = {
    id: `event-${events.length + 1}`,
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: fd.get("tarih"),
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    capacity: kontenjan ? Number(kontenjan) : null,
    description: fd.get("aciklama").trim(),
  };

  console.log(data);
});