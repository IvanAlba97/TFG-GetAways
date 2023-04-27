import React, { useState, useEffect } from 'react';
import '../styles/TextTruncator.css';

const TextTruncator = ({ text, maxLength = 100 }) => {
  const [isExpanded, setExpanded] = useState(false);
  const truncatedText = truncateText(text, maxLength, isExpanded);

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleTruncate = () => {
    setExpanded(false);
  };

  function truncateText(text, maxLength, isExpanded) {
    if (isExpanded) {
      return text;
    }
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  useEffect(() => {
    setExpanded(false);
  }, [text]);

  useEffect(() => {
    setExpanded(false);
  }, [maxLength]);

  return (
    <div>
      <div>
        {truncatedText.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
      {text.length > maxLength &&
        (isExpanded ? (
          <span className='truncate-text' onClick={handleTruncate}>
            Ver menos
          </span>
        ) : (
          <span className='expand-text' onClick={handleExpand}>
            Ver más
          </span>
        ))}
    </div>
  );
};

export default TextTruncator;
