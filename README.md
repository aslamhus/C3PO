# Sylvan Binary Game

## Structure

Each "game" has its own component. C3PO game has the C3PO component and its own hook (useC3PO)

### Game Stage and Game Control

Game Stage represents the viewing field for the game. Game Control contains all components that allow the user to control the game (keypads, inputs, responses to questions)

GameStage may access game control methods by being exposesd to the game control hook, useGameControl. i.e. beginGame is a game control method that is exposed to the game stage button that starts the game.

#### Begin Game
