import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <Link className="buton" to="/">Ana sayfaya dön</Link>
    </>
  );
}

export default NotFoundPage;
