interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

      <form
        className="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
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
          <button type="submit">Kaydet</button>
        </p>
      </form>
    </>
  );
}

export default EventForm;
