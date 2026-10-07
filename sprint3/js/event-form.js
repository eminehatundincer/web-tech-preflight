import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");

const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

// YENİ: Bu form güncelleme formu mu? (ekleme sayfasında data-mode yok)
const guncellemeMi = form.dataset.mode === "guncelle";

// YENİ: Adresteki id'yi oku ve etkinliği bul
const id = new URLSearchParams(location.search).get("id");
const etkinlik = events.find((e) => e.id === id);

// ---------- Formu oku, nesneye çevir ----------
function formuOku() {
  const fd = new FormData(form);
  const kontenjan = fd.get("kontenjan");
  return {
    // YENİ: güncellemede id korunur, eklemede yeni id üretilir
    id: guncellemeMi ? etkinlik.id : `event-${events.length + 1}`,
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: fd.get("tarih"),
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    capacity: kontenjan ? Number(kontenjan) : null,
    description: fd.get("aciklama").trim(),
  };
}

// ---------- Kurallara göre kontrol et ----------
function dogrula(data) {
  const errors = {};
  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (data.category === "") errors.kategori = "Bir kategori seçin.";
  if (data.date === "") errors.tarih = "Tarih seçin.";
  if (data.time === "") errors.saat = "Saat seçin.";
  if (data.location === "") errors.yer = "Yer bilgisini yazın.";
  if (data.capacity !== null &&
      (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
  }
  return errors;
}

// ---------- Hataları göster / temizle ----------
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

// YENİ: Formu etkinliğin bilgileriyle doldur
function formuDoldur(e) {
  form.elements.ad.value = e.title;
  form.elements.kategori.value = e.category;
  form.elements.tarih.value = e.date;
  form.elements.saat.value = e.time;
  form.elements.yer.value = e.location;
  form.elements.kontenjan.value = e.capacity ?? "";
  form.elements.aciklama.value = e.description;
}

// YENİ: Güncelleme sayfası id'siz ya da geçersiz id ile açıldıysa formu gösterme
if (guncellemeMi && !etkinlik) {
  document.querySelector("#form-aciklama")?.remove();
  mesaj.remove();
  form.outerHTML = `
    <p class="hata-kutusu">
      Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin,
      detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
    </p>
    <a class="buton" href="etkinlikler.html">Etkinliklere git</a>
  `;
} else {
  // YENİ: Güncelleme sayfasıysa alanları doldur
  if (guncellemeMi) {
    formuDoldur(etkinlik);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = formuOku();
    const errors = dogrula(data);
    hatalariGoster(errors);

    if (Object.keys(errors).length > 0) {
      mesaj.className = "hata-kutusu";
      mesaj.textContent = "Formda hatalı alanlar var. Kırmızı alanları düzeltin.";
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    // YENİ: Mesaj sayfaya göre değişir
    const baslik = guncellemeMi
      ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
      : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";

    mesaj.className = "basari-kutusu";
    mesaj.innerHTML = `<p>${baslik}</p><pre></pre>`;
    mesaj.querySelector("pre").textContent = JSON.stringify(data, null, 2);
    console.log(data);
  });
}