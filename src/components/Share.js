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

  const handleClick = async () => {
    await navigator.clipboard.writeText(url);
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
        <div className="copy-url-container">
          <button className='btn' onClick={handleClick}>
            Copiar URL
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Share;