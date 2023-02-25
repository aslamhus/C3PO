import React from 'react';
import images from './images';
import './binary-message.css';

export default function BinaryMessage() {
  return (
    <div className="binary-message">
      {images.map((src, index) => {
        return (
          <div key={`binary-message-img-${src}`}>
            <img id={`binary-message-${index}`} src={src}></img>
          </div>
        );
      })}
    </div>
  );
}
