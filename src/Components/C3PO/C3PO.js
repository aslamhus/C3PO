import React, { useEffect, useState, useRef, useContext } from 'react';
import c3po from '../../../images/C-3P0.png';
import BinaryMessage from '../Binary/BinaryMessage';
import SpeechBubble from '../SpeechBubble/SpeechBubble';
import { GameStageContext } from '../GameStage/context';
import Body from './Body/Body';
import './c3po.css';

const C3PO = React.forwardRef((props, ref) => {
  const [viewScreenState, dispatch] = useContext(GameStageContext);

  return (
    <>
      <div className="c3po-container">
        <img src={c3po} className="c3po-reference"></img>

        <Body ref={ref}>
          <SpeechBubble speech={viewScreenState?.speech} />
        </Body>
      </div>

      {/* <BinaryMessage /> */}
    </>
  );
});
export default C3PO;
