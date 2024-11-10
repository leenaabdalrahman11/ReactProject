import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.css';

export default function Header() {
    const isAuthenticated = !!localStorage.getItem('userToken');

    return (
        <header className={isAuthenticated ? style.headerAuth : style.headerWelcome}>
            {isAuthenticated ? (
                <nav className={style.navLinks}>
                    <div className={style.welcomeContent}>
                        <h1 className={style.title}>Welcome to Leenaty Shop</h1>
                        <p>Your one-stop destination for quality products.</p>
                        <div className={style.authButtons}>
                            <Link to="/Products" className={`${style.btn} ${style.btnSecondary}`} >Products</Link>
                            <Link to="/cart" className={`${style.btn} ${style.btnPrimary}`}>Cart</Link>
                        </div>
                    </div>
                </nav>
            ) : (
                <nav className={style.navLinks}>
                <div className={style.welcomeContent}>
                        <h1 className={style.title}>Welcome to Leenaty Shop</h1>
                        <p>Your one-stop destination for quality products.</p>
                    <div className={style.authButtons}>
                        <Link className={`${style.btn} ${style.btnPrimary}`} to="/Login">Login</Link>
                        <Link className={`${style.btn} ${style.btnSecondary}`} to="/Register">Register</Link>
                    </div>
                </div>
                </nav>
            )}
        </header>
    );
}
