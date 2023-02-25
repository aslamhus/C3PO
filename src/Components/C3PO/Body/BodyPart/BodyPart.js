import React from 'react';
import './body-part.css';

export default function BodyPart({ src, style, className, children, showBoundingBox }) {
  const getStyle = () => {
    if (showBoundingBox) {
      return { ...style, backgroundColor: 'rgba(0,0,200,0.5)', border: '1px solid blue' };
    }
    return style;
  };

  return (
    <div style={{ ...getStyle() }} className={`${className} body-part`}>
      {src && <img src={src} />}

      {children}
    </div>
  );
}
