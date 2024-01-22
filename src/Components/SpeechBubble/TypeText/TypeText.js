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

let timeouts = [];
const TypeText = ({
  show,
  children,
  onTypingStart,
  onTypingComplete,
  onBeforeType,
  typeSpeed = 0.1,
}) => {
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
          if (
            typeof child == 'string' ||
            typeof child == 'number' ||
            child.type == 'span' ||
            child.type == 'p'
          ) {
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
      const timeout = setTimeout(() => {
        setTypedText(
          <>
            {typedTextRef.current}
            {char}
          </>
        );
        resolve();
      }, typeSpeed * 1000);
      timeouts.push(timeout);
    });
  };

  const beginTyping = async () => {
    const textNodes = getTextNodes(children);
    for (let node of textNodes) {
      // is the node a primitive, i.e. string or number?
      if (typeof node == 'number') node = node.toString();
      if (typeof node == 'string') {
        let length = node.length;
        if (typeof node == 'number') {
        }
        for (let i = 0; i < node.length; i++) {
          const char = node[i];
          await type(char);
        }
      } else {
        // node is react component (object)
        // find text node within it.
        const text = node.props.children;
        if (typeof text != 'string' && typeof text != 'number') {
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

  /**
   * Render type text
   *
   * Witness the convulted trick of maintaining the bounds of the target
   * text container... Clone the target to be typed and replace its children with
   * an invisible clone of its original children. We set its opacity to 0 so
   * it is inivisble but still retains its original position in the window.
   * Then, adjacent to the invisible clone, add an absolute positioned
   * div which will contain the typed text.
   *
   * @returns {React.ReactElement}
   */
  const renderTypeText = () => {
    return React.Children.map(children, (child) => {
      if (child.props.className.includes('type-text-target')) {
        const Clone = React.cloneElement(child, {
          style: { position: 'relative' },
          ...child.props,
          children: (
            <>
              {React.cloneElement(child, { style: { opacity: 0 } })}
              <div
                className="typed-text-actual"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              >
                {typedText}
              </div>
            </>
          ),
        });
        return Clone;
      }
      return child;
    });
  };

  useEffect(() => {
    if (show) {
      timeouts = [];
      setTypedText(null);
      if (onTypingStart instanceof Function) {
        onTypingStart();
      }
      // if (onBeforeType instanceof Function) {
      //   onBeforeType();
      // }
      console.log('begin typing');
      beginTyping().then(handleTypingComplete);
    } else {
      /**Clean up timeouts */
      timeouts.forEach((timeout) => clearTimeout(timeout));
    }
  }, [show]);

  return <div>{show ? renderTypeText() : children}</div>;
};

export default TypeText;
