// Navbar.jsx
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/DataContext";
import style from './Navbar.module.css';
import logo from './logo.png';

export default function Navbar() {
  const { isLogin, userData, setisLogin, setuserData } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("userToken");
    setisLogin(false);
    setuserData({});
    navigate("/Welcome");
  }

  return (
    <nav
      className={`${isScrolled ? style.navbarScrolled : style.navbarTransparent} navbar navbar-expand-lg `}
    >
      <div className={`container-fluid ${style.Container}`}>
        <Link className={`navbar-brand  to="/"`}> 
        <img src={logo} alt="Logo" className={style.logo}/>
         </Link>
        
          <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse  `} id="navbarNav">
          <ul className="navbar-nav">
            {isLogin ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${style.navlink}`} to="/">
                    Welcome {userData.userName}
                  </Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${style.navlink}`} to="/Profile">
                Profile
                  </Link>
                </li>
                <li className="nav-item">
                <Link to="/cart" className={`nav-link ${style.navlink}`}>Cart</Link>
                </li>
                <li className="nav-item">
                <Link to="/Products" className={`nav-link ${style.navlink}`}>Products</Link>
                </li>
                <li className="nav-item">
                  <button className={`nav-link ${style.navlink}`} onClick={handleLogout}>
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${style.navlink}`} to="/Login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${style.navlink}`}  to="/Register">Register</Link>
                </li>
              </>
            )}
          </ul>
         </div>
      </div>
    </nav>
  );
}
