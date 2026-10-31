import React from 'react';
import background from '@images/backgrounds/tatooine-background.png';
import midground from '@images/backgrounds/tatooine-midground.png';
import foreground from '@images/backgrounds/tatooine-foreground.png';
import './tatooine-background.css';

export default function TatooineBackground({ children }) {
  return (
    <div className="tatooine-bg-container">
      <div className="tatooine-background" style={{ backgroundImage: `url(${background})` }}></div>
      <div className="tatooine-midground" style={{ backgroundImage: `url(${midground})` }}></div>
      <div className="tatooine-foreground" style={{ backgroundImage: `url(${foreground})` }}></div>
      {/* 
        Place children that you'd like to exist between background areas here and set the z-index appropriately
        background: 0
        midground: 1
        foreground: 2
      
      */}
      {children}
    </div>
  );
}
