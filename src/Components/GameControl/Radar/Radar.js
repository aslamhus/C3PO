import React from 'react';
import './radar.css';

export default function Radar({ style, className }) {
  return (
    <div className="radar-container" style={style}>
      <div className={`radar${className ? ` ${className}` : ''}`}>
        <div className="outer-circle"></div>
        <div className="inner-circle"></div>
        <div className="central-dot"></div>
        <div className="pulse-circle"></div>
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
}
