import React, { useContext } from 'react';
import './view-screen.css';
import { GameControlContext } from '../Context/context';

export default function ViewScreen({ on, children }) {
  // console.log('viewscreen', isViewScreenOn);
  return (
    <div
      className={`
        control-view-screen shadow
        ${on ? 'on' : ''}
        `}
    >
      {children}
    </div>
  );
}
