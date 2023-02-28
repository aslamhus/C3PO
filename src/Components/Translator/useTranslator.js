import React, { useRef, useState } from 'react';

/**
 * Note on useTranslator imperative sneakiness.
 *
 * Becuase we are adding the letter case toggle button to
 * the parent GameControl component while maintaining the state of the
 * toggle button inside a child component (Translator),
 * the button in the parent context does not have access to the child component's state.
 * So we have to update the button every time the state is changed manually
 * so that its onclick handler sets the correct case.
 *
 * Why did we do this? Because we don't want to clutter GameControl's
 * controlStrip jsx with unecessary logic. There is probably a better way to do this
 * that balances clutter and sticks to a functional programming paradigm.
 *  But for now we are using this imperative trick.
 *
 */
export const useTranslator = ({ setControlStripComponent }) => {
  const [letterCase, _setLetterCase] = useState('lowercase');
  const letterCaseRef = useRef(letterCase);

  const setLetterCase = (value) => {
    _setLetterCase(value);
    letterCaseRef.current = value;
  };

  const updateControlStripComponent = () => {
    setControlStripComponent(
      <>
        <button onClick={toggleLetterCase}>
          {letterCaseRef.current == 'lowercase' ? 'AZ' : 'az'}
        </button>
        <button onClick={toggleLetterCase}>123</button>
        <button onClick={toggleLetterCase}>#+=</button>
      </>
    );
  };
  const handleLoad = () => updateControlStripComponent(letterCase);

  const toggleLetterCase = () => {
    const newCase = letterCaseRef.current == 'uppercase' ? 'lowercase' : 'uppercase';
    setLetterCase(newCase);
    updateControlStripComponent(newCase);
  };

  const handlePressLetter = (letter, binary) => {
    setControlStripComponent(
      <>
        <p>
          {letter} - {binary}
        </p>
      </>,
      'secondary',
      { overwrite: true }
    );
  };

  return { handlePressLetter, handleLoad, letterCase };
};
