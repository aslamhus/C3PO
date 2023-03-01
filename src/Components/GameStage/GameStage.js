import React, { useContext, useEffect, useReducer } from 'react';
import { GameStageContext } from './context';
import StarWarsLoader from '../StarWarsLoader/StarWarsLoader';
import BinaryMessage from '../Binary/BinaryMessage';
import './game-stage.css';

export default function GameStage(props) {
  const [{ loaded, showBinary, guessChar }] = useContext(GameStageContext);

  return (
    <div className="game-stage">
      {props.children}
      {!loaded && <StarWarsLoader />}
      <BinaryMessage show={showBinary} guessChar={guessChar}></BinaryMessage>
    </div>
  );
}
