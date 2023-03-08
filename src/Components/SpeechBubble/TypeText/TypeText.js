import React, { useState, useEffect, useRef } from 'react';
import './type-text.css';

/**
 * TypeText
 *
 * TypeText scans children for nodes with string values,
 * and types those strings at the specified speed.
 *
 * The parent node to search for string values must
 * have the className 'type-text-target'.
 *
 * @component
 */
const TypeText = ({ show, children, onTypingComplete, typeSpeed = 0.1 }) => {
  const [typedText, _setTypedText] = useState(null);
  const typedTextRef = useRef(null);
  const setTypedText = (value) => {
    typedTextRef.current = value;
    _setTypedText(value);
  };

  const getTextNodes = (children) => {
    let textNodes = [];
    const recursiveNodeSearch = (children) => {
      const childArray = React.Children.toArray(children);
      if (Array.isArray(childArray)) {
        childArray.forEach((child, index) => {
          if (typeof child == 'string' || child.type == 'span' || child.type == 'p') {
            textNodes.push(childArray[index]);
          } else {
            if (child?.props?.children) {
              recursiveNodeSearch(child.props.children);
            }
          }
        });
      }
    };
    recursiveNodeSearch(children);
    return textNodes;
  };

  const type = (char) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTypedText(
          <>
            {typedTextRef.current}
            {char}
          </>
        );
        resolve();
      }, typeSpeed * 1000);
    });
  };
  const beginTyping = async () => {
    const textNodes = getTextNodes(children);
    for (let node of textNodes) {
      // is the node pure text?
      if (typeof node === 'string') {
        for (let i = 0; i < node.length; i++) {
          const char = node[i];
          await type(char);
        }
      } else {
        // node is react component
        // find text node within it.
        const text = node.props.children;
        if (typeof text != 'string') {
          throw new Error('text node child was not of type string');
        }
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const clone = React.cloneElement(node, { children: char });
          await type(clone);
        }
      }
    }
    return;
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
          children: typedText,
        });
        return Clone;
      }
      return child;
    });
  };

  useEffect(() => {
    if (show) {
      setTypedText(null);
      beginTyping().then(handleTypingComplete);
    }
  }, [show]);
  return <>{show ? renderTypeText() : children}</>;
};

export default TypeText;
