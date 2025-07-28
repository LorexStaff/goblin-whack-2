import './styles.css';
import Game from './classes/Game.js';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.start();
});
