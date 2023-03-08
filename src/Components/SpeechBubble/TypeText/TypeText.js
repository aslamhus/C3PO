import React, { useState, useEffect, useRef } from 'react';
import './type-text.css';

const TypeText = ({ show, text, children, onTypingComplete, typeSpeed = 0.1 }) => {
  const [typedText, _setTypedText] = useState('');
  const typedTextRef = useRef('');
  const setTypedText = (value) => {
    typedTextRef.current = value;
    _setTypedText(value);
  };

  const beginTyping = () => {
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        setTypedText(`${typedTextRef.current}${text[i]}`);
        if (i == text.length - 1) {
          handleTypingComplete();
        }
      }, typeSpeed * 1000 * i);
    }
  };

  const handleTypingComplete = () => {
    if (onTypingComplete instanceof Function) {
      onTypingComplete();
    }
  };
  const renderTypeText = () => {
    return React.Children.map(children, (child) => {
      if (child.props.className.includes('type-text-target')) {
        const Clone = React.cloneElement(child, {
          style: { opacity: 1 },
          dangerouslySetInnerHTML: { __html: typedText },
        });
        return Clone;
      }
      return child;
    });
  };

  useEffect(() => {}, [text]);

  useEffect(() => {
    if (show) {
      setTypedText('');
      beginTyping();
    }
  }, [show]);
  return <>{show ? renderTypeText() : children}</>;
};

export default TypeText;
