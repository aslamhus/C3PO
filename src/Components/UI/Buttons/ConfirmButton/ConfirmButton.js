import React from 'react';
import { fx } from '../../../hooks/useGameSound';
import GameButton from '../GameButton';
import './confirm-button.css';

const ConfirmButton = React.forwardRef((props, ref) => {
  return <GameButton {...props} sound={fx.confirm} ref={ref} />;
});

export default ConfirmButton;
