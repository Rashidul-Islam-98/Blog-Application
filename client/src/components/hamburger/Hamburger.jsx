import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./hamburger.css";

export default function Hamburger({ user, handleLogout, setMenuOpen }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.hamburgerContainer')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setMenuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="hamburgerContainer">
      <div className="closeIcon" onClick={() => setMenuOpen(false)}>
        <i className="fas fa-times"></i>
      </div>
      <ul className="hamburgerList">
        <li className="hamburgerListItem" onClick={handleLinkClick}>
          <Link className="link" to="/">
            HOME
          </Link>
        </li>
        <li className="hamburgerListItem" onClick={handleLinkClick}>
          <Link className="link" to="/about">
            ABOUT
          </Link>
        </li>
        <li className="hamburgerListItem" onClick={handleLinkClick}>
          <Link className="link" to="/contact">
            CONTACT
          </Link>
        </li>
        <li className="hamburgerListItem" onClick={handleLinkClick}>
          <Link className="link" to="/write">
            WRITE
          </Link>
        </li>
        <li className="hamburgerListItem" onClick={() => {
          handleLogout();
          setMenuOpen(false);
        }}>
          {user && "LOGOUT"}
        </li>
      </ul>
    </div>
  );
}