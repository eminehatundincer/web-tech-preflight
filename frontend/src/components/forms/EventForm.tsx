import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Category, EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

// Kategori seçenekleri bir diziden map ile
const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

// Form kaydetmeyi bilmez; veriyi sayfaya verir
function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  // Tek handleChange bütün alanlara yeter: name'e bakar
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  // Gönder → doğrula → hata yoksa yukarı bildir
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <p>
        <label htmlFor="title">Etkinlik Adı *</label><br />
        <input type="text" id="title" name="title" placeholder="Örn. Kariyer Günleri"
          value={data.title} onChange={handleChange}
          aria-invalid={errors.title ? true : undefined} />
        <span className="hata-metni">{errors.title}</span>
      </p>

      <p>
        <label htmlFor="category">Kategori *</label><br />
        <select id="category" name="category"
          value={data.category} onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}>
          <option value="">Seçiniz</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span className="hata-metni">{errors.category}</span>
      </p>

      <p>
        <label htmlFor="date">Tarih *</label><br />
        <input type="date" id="date" name="date"
          value={data.date} onChange={handleChange}
          aria-invalid={errors.date ? true : undefined} />
        <span className="hata-metni">{errors.date}</span>
      </p>

      <p>
        <label htmlFor="time">Saat *</label><br />
        <input type="time" id="time" name="time"
          value={data.time} onChange={handleChange}
          aria-invalid={errors.time ? true : undefined} />
        <span className="hata-metni">{errors.time}</span>
      </p>

      <p>
        <label htmlFor="location">Yer *</label><br />
        <input type="text" id="location" name="location" placeholder="Örn. A Blok Konferans Salonu"
          value={data.location} onChange={handleChange}
          aria-invalid={errors.location ? true : undefined} />
        <span className="hata-metni">{errors.location}</span>
      </p>

      <p>
        <label htmlFor="capacity">Kontenjan</label><br />
        <input type="number" id="capacity" name="capacity" min={1} max={1000}
          value={data.capacity} onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined} />
        <span className="hata-metni">{errors.capacity}</span>
      </p>

      <p>
        <label htmlFor="description">Açıklama</label><br />
        <textarea id="description" name="description" rows={4} cols={40}
          value={data.description} onChange={handleChange}
          aria-invalid={errors.description ? true : undefined} />
        <span className="hata-metni">{errors.description}</span>
      </p>

      <p>
        <button type="submit">{submitText}</button>
      </p>
    </form>
  );
}

export default EventForm;
