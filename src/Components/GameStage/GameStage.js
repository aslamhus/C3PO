import React, { useContext, useEffect, useReducer } from 'react';
import { GameStageContext } from './context';
import StarWarsLoader from '../StarWarsLoader/StarWarsLoader';
import './game-stage.css';

export default function GameStage(props) {
  const [{ loaded }] = useContext(GameStageContext);

  return (
    <div className="game-stage">
      {props.children}
      {/* <StarWarsLoader /> */}
      {!loaded && <StarWarsLoader />}
    </div>
  );
}
