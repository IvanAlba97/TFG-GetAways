import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className='contact-info'>
        <h3>Contacto</h3>
        <p>Email: getaways.tfg@gmail.con</p>
        <p>Phone: +1 123 456 7890</p>
      </div>
      <div className='social-media'>
        <h3>Síguenos</h3>
        {/* <a href='#'> */}<p>Facebook</p>{/* </a> */}
        {/* <a href='#'> */}<p>Twitter</p>{/* </a> */}
        {/* <a href='#'> */}<p>Instagram</p>{/* </a> */}
      </div>
      <p className='copyright'>Copyright &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
