import type { EventFormData, EventFormErrors } from "../types/campus-event";

// Veri girer, hata nesnesi çıkar; hata yoksa {} döner
export function validateEvent(data: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};
  if (data.title.trim().length < 3)
    errors.title = "En az 3 karakter olmalı.";
  if (data.category === "")
    errors.category = "Bir kategori seçin.";
  // tarih, saat, yer: boş olamaz
  if (data.date === "")
    errors.date = "Tarih seçin.";
  if (data.time === "")
    errors.time = "Saat seçin.";
  if (data.location.trim() === "")
    errors.location = "Yer boş olamaz.";
  const capacity = Number(data.capacity);
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1000)
    errors.capacity = "1 ile 1000 arası tam sayı.";
  // açıklama: en az 10 karakter
  if (data.description.trim().length < 10)
    errors.description = "En az 10 karakter olmalı.";
  return errors;
}
