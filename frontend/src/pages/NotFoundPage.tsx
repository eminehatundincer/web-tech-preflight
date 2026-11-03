import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <Link className="buton" to="/">Ana sayfaya dön</Link>
    </>
  );
}

export default NotFoundPage;
