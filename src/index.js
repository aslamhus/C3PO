import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import GameStageProvider from './Components/GameStage/GameStageProvider.js';
const renderDiv = document.getElementById('render');
const root = createRoot(renderDiv);
root.render(<App />);
