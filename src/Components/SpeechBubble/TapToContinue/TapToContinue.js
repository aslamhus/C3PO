import React, { useEffect } from 'react';
import tapGif from '@images/tap.gif';
import './tap-to-continue.css';

const TapToContinue = () => {
  useEffect(() => {
    document.body.style.cursor = 'pointer';
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <div className="tap-to-continue tap-gif-icon">
      <img src={tapGif} />
    </div>
  );
};

export default TapToContinue;
