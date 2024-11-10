import React, { useContext } from 'react'; 
import { Link } from 'react-router-dom'; 
import FooterLogo from './FooterLogo.png';
import style from './Footer.module.css';
import { UserContext } from '../../../context/DataContext';

export default function Footer() {
  const { isLogin } = useContext(UserContext); 

  return (
    <footer className={style.FooterSection}>
      <div className={style.Container}>
        <div className={style.row}>
          <div className={style.Main}>
            <div className={style.SubFooter}>
              {isLogin ? ( 
                <div className={style.FooterInfo}>
                  <div className={`${style.Sub} ${style.Sub1}`}>
                    <h2>About Us</h2>
                    <p>
                      At Leenaty Shop, we deliver exceptional service and innovative solutions to meet our customers' needs. Our dedicated team is committed to exceeding expectations and fostering lasting relationships. We're here to help you achieve your goals.
                    </p>
                  </div>
                  <div className={`${style.Sub} ${style.Sub2}`}>
                    <h2>Useful Links</h2>
                    <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/categories">Categories</Link></li>
                      <li><Link to="/products">Products</Link></li>
                      <li><Link to="/cart">Carts</Link></li>
                    </ul>
                  </div>
                  <div className={`${style.Sub} ${style.Sub3}`}>
                    <h2> Contact Details</h2>
                    <p><i className={`fa-solid fa-location-dot ${style.ii}`}></i> Ramallah - Birzeit</p>
                    <p><i className={`fa-solid fa-phone ${style.ii}`}></i>+972 ********</p>
                    <p><i className={`fa-solid fa-envelope ${style.ii}`}></i> leenasa272@gmail.com</p>
                  </div>
                </div>
              ) : (
                <p>Please log in to see more options.</p> 
              )}
            </div>
            <div className={style.Image}>
              <img src={FooterLogo} alt="Footer Logo" />
            </div>
            <div className={style.Icons}>
              <ul>
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className={`fa-brands fa-facebook ${style.i}`}></i>
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <i className={`fa-brands fa-linkedin ${style.i}`}></i>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className={`fa-brands fa-instagram ${style.i}`}></i>
                  </a>
                </li>
                <li>
                  <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                    <i className={`fa-brands fa-whatsapp ${style.i}`}></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
