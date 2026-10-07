import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");

// Hata kontrolü yapılacak alanların name değerleri
const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

// ---------- 1) Formu oku, nesneye çevir (Adım 9) ----------
function formuOku() {
  const fd = new FormData(form);
  const kontenjan = fd.get("kontenjan");
  return {
    id: `event-${events.length + 1}`,
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: fd.get("tarih"),
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    capacity: kontenjan ? Number(kontenjan) : null,
    description: fd.get("aciklama").trim(),
  };
}

// ---------- 2) Kurallara göre kontrol et, hataları topla ----------
function dogrula(data) {
  const errors = {};

  if (data.title.length < 3) {
    errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  }
  if (data.category === "") {
    errors.kategori = "Bir kategori seçin.";
  }
  if (data.date === "") {
    errors.tarih = "Tarih seçin.";
  }
  if (data.time === "") {
    errors.saat = "Saat seçin.";
  }
  if (data.location === "") {
    errors.yer = "Yer bilgisini yazın.";
  }
  // Kontenjan zorunlu değil; ama girildiyse 1–1000 arası tam sayı olmalı
  if (data.capacity !== null &&
      (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
  }

  return errors;
}

// ---------- 3) Hataları alanların altına yaz / eski hataları temizle ----------
function hatalariGoster(errors) {
  alanlar.forEach((alan) => {
    const input = form.elements[alan];
    const hataYeri = document.querySelector(`#${alan}-hata`);

    if (errors[alan]) {
      hataYeri.textContent = errors[alan];
      input.setAttribute("aria-invalid", "true");
    } else {
      hataYeri.textContent = "";
      input.removeAttribute("aria-invalid");
    }
  });
}

// ---------- 4) Kaydet'e basılınca ----------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = formuOku();
  const errors = dogrula(data);
  hatalariGoster(errors);

  // Hata varsa: kırmızı mesaj göster ve dur
  if (Object.keys(errors).length > 0) {
    mesaj.className = "hata-kutusu";
    mesaj.textContent = "Formda hatalı alanlar var. Kırmızı alanları düzeltin.";
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  // Hata yoksa: yeşil kutu + oluşan nesne
  mesaj.className = "basari-kutusu";
  mesaj.innerHTML = `
    <p>Etkinlik oluşturuldu (bu sprintte kaydedilmez):</p>
    <pre></pre>
  `;
  mesaj.querySelector("pre").textContent = JSON.stringify(data, null, 2);
  console.log(data);
});