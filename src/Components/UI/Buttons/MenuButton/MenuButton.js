import React from 'react';
import { fx } from '../../../hooks/useGameSound';
import GameButton from '../GameButton';
import './menu-button.css';

const MenuButton = React.forwardRef((props, ref) => {
  const { className } = props;
  return (
    <GameButton
      className={`menu-button${className ? ` ${className}` : ''}`}
      sound={fx.click}
      ref={ref}
      {...props}
    />
  );
});

export default MenuButton;
