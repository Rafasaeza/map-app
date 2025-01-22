
import SignOut from "../sign-out";
import './Nav.css'; // Asegúrate de importar el archivo CSS

export default function Nav() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/explore">Explore</a></li>
        <li><SignOut></SignOut></li>
      </ul>
    </nav>
  );
}