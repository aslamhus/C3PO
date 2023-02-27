import React, { useEffect, useRef } from 'react';
import images from './images';
import gsap from 'gsap';
import './binary-message.css';

export default function BinaryMessage({ show }) {
  const binaryRef = useRef();
  useEffect(() => {
    console.log('show!', show);
    if (show) {
      gsap.fromTo(binaryRef.current, { opacity: 0, y: '+50%' }, { opacity: 1, y: 0, duration: 1 });
    }
  }, [show]);

  return (
    <div ref={binaryRef} className="binary-message" style={{ opacity: 0 }}>
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
