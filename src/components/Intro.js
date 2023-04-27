import Logo from '../img/Logo2.2.png';
import '../styles/Intro.css';

const Intro = () => {
  return (
    <div className='contenedor-intro'>
      <div className='logo'>
        <img src={Logo} alt='Logo' />
      </div>
      <div className='text'>
        <strong>GetAways</strong> es una aplicación web diseñada para los amantes de la naturaleza y el senderismo. Podrás guardar tus rutas favoritas y compartirlas con otros senderistas, convirtiéndola en la herramienta perfecta para tus aventuras al aire libre.
      </div>
    </div>
  );
};

export default Intro;