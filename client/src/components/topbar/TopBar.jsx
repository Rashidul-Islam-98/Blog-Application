import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import Hamburger from "../hamburger/Hamburger";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="top">
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? (
          <i className="topIcon fas fa-times"></i>
        ) : (
          <i className="topIcon fas fa-bars"></i>
        )}
      </div>
      {menuOpen && (
        <Hamburger
          user={user}
          handleLogout={handleLogout}
          setMenuOpen={setMenuOpen}
        />
      )}

      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={user.profilePic.url} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
