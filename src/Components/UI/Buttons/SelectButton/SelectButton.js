import React from 'react';
import { fx } from '../../../hooks/useGameSound';
import GameButton from '../GameButton';
import './select-button.css';

const SelectButton = React.forwardRef((props, ref) => {
  return <GameButton sound={fx.select} ref={ref} {...props} />;
});

export default SelectButton;
