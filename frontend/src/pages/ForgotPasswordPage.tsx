import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

// Bu sprintte sadece sayfa: bağlantı gerçekten gönderilmez (demo)
function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.includes("@")
      ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <>
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>

      {sent && <p className="mesaj mesaj-basari">
        Bağlantı {email} adresine gönderildi (demo).
      </p>}

      <form className="form" noValidate onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">E-posta</label>
          <input type="email" id="email" name="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined} />
          <span className="hata-metni">{error}</span>
        </p>

        <p>
          <button type="submit">Bağlantıyı gönder</button>
        </p>
      </form>

      <p>
        <Link to="/login">← Girişe dön</Link>
      </p>
    </>
  );
}

export default ForgotPasswordPage;
