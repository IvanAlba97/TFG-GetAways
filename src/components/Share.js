import React, { useState } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import '../styles/Share.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Share = () => {
  const url = window.location.href;
  /* const [copied, setCopied] = useState(false); */

  const handleClick = async () => {
    await navigator.clipboard.writeText(url);
    /* setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000); */
    toast.success("Copiado al portapapeles.");
  };

  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Compartir</h3>
      <div className="share-container">
        <FacebookShareButton url={url} className="share-button">
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={url} className="share-button">
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={url} className="share-button">
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <EmailShareButton url={url} className="share-button">
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
        {/* <input type="text" value={url} readOnly className="share-input" /> */}
        <div className="copy-url-container">
          <button className='btn' onClick={handleClick}>
            Copiar URL
          </button>
        </div>
      </div>
      {/* {copied && <p className="copy-url-message">Copiado al portapapeles</p>} */}
      <ToastContainer />
    </div>
  );
};

export default Share;