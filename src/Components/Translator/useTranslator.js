import React, { useRef, useState } from 'react';
import MenuButton from '../UI/Buttons/MenuButton/MenuButton';

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
  const [charGroup, _setCharGroup] = useState('lowercase');
  const charGroupRef = useRef(charGroup);

  const setCharGroup = (value) => {
    _setCharGroup(value);
    charGroupRef.current = value;
  };

  const updateControlStripComponent = () => {
    setControlStripComponent(
      <>
        <MenuButton onClick={toggleLetterCase}>
          {charGroupRef.current == 'lowercase' ? 'AZ' : 'az'}
        </MenuButton>
        <MenuButton onClick={() => setCharGroup('numbers')}>123</MenuButton>
        <MenuButton onClick={() => setCharGroup('punctuation')}>#+=</MenuButton>
      </>
    );
  };
  const handleLoad = () => updateControlStripComponent(charGroup);

  const toggleLetterCase = () => {
    const newCase = charGroupRef.current == 'uppercase' ? 'lowercase' : 'uppercase';
    setCharGroup(newCase);
    updateControlStripComponent(newCase);
  };

  const handlePressChar = (char, binary) => {
    setControlStripComponent(
      <>
        <p>
          {char} - {binary}
        </p>
      </>,
      'secondary',
      { overwrite: true }
    );
  };

  return { handlePressChar, handleLoad, charGroup };
};
