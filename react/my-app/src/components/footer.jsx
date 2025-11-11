import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="social-icons">
        <a href="https://www.facebook.com"><img src="/images/fb.png" alt="Facebook" /></a>
        <a href="https://www.instagram.com"><img src="/images/ig.png" alt="Instagram" /></a>
        <a href="https://www.x.com"><img src="/images/tw.png" alt="Twitter" /></a>
      </div>
      <div className="footer-links">
        <p>&copy; 2025 El Emporio del Lector. Todos los derechos reservados.</p>
        <a href="#">Términos y Condiciones</a>
      </div>
    </footer>
  );
}

export default Footer;
