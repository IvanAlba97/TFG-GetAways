import React from 'react';
import '../estilos/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="contact-info">
        <h3>Contact Us</h3>
        <p>Email: contact@example.com</p>
        <p>Phone: +1 123 456 7890</p>
      </div>
      <div className="social-media">
        <h3>Follow Us</h3>
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
      </div>
      <p className="copyright">Copyright &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
