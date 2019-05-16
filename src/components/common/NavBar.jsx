import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="ygi-header ygi-header--fixed ygi-header--light">
      <div className="container col-12">
        <nav className="ygi-header__nav-container ygi-header__nav-container">
          <div className="ygi-header__brand">
            <a className="" href="/" style={{ display: 'block' }}>
              <img
                className="ygi-header__logo"
                src="https://yogainternational.com/assets/fonts/icons/icon-logo.svg"
                alt="Yoga International"
              />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
