import React from 'react';
import GameStage from './Components/GameStage/GameStage.js';
import GameControl from './Components/GameControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fonts/starjedi/starjedi.css';
import './fonts.css';
import './buttons.css';
import './app.css';

export default function App() {
  return (
    <div className="app">
      <GameStage></GameStage>
      <GameControl></GameControl>
    </div>
  );
}
