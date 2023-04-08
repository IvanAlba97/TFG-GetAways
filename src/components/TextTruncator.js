import React, { useState } from "react";
import '../styles/TextTruncator.css';

const TextTruncator = ({ text, maxLength = 100 }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [truncatedText, setTruncatedText] = useState("");

  const handleExpand = () => {
    setExpanded(true);
    setTruncatedText(text);
  };

  const handleTruncate = () => {
    setExpanded(false);
    setTruncatedText(text.slice(0, maxLength) + "...");
  };

  return (
    <div>
      {isExpanded ? (
        <div>
          {text}
          <br />
          <span className="truncate-text" onClick={handleTruncate}>Ver menos</span>
        </div>
      ) : (
        <div>
          {truncatedText || text.slice(0, maxLength) + "..."}
          <br />
          <span className="expand-text" onClick={handleExpand}>Ver más</span>
        </div>
      )}
    </div>
  );
};

export default TextTruncator;
