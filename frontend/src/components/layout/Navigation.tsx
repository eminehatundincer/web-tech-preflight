import { NavLink } from "react-router-dom";

// Menü öğeleri: map ile çizilir
const menu = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
  { to: "/login", label: "Giriş" },
];

function Navigation() {
  return (
    <nav>
      {menu.map((item) => (
        // NavLink açık sayfaya kendisi aria-current="page" ekler
        <NavLink key={item.to} to={item.to} end={item.to === "/"}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;
