import React from 'react';
import './styles.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <a href="/" className="logo">
          <img src="/img/footer/logo-white.png" alt="" />
        </a>
        <div className="footer__info">
          <ul className="footer__list">
            <li>
              <a href="">Contact Us</a>
            </li>
            <li>
              <a href="">Sitemap</a>
            </li>
            <li>
              <a href="" target="_blank">
                Privacy Policy
              </a>
            </li>
          </ul>
          <span>
            Copyright 2021 Canadian Virtual Hospice. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
