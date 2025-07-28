import GameBoard from './GameBoard.js';
import Goblin from './Goblin.js';

export default class Game {
  constructor() {
    this.board = new GameBoard();
    this.scoreElement = document.getElementById('score');
    this.missesElement = document.getElementById('misses');
    this.score = 0;
    this.misses = 0;
    this.currentGoblin = new Goblin(); 
    this.missTimeout = null;
    this.gameActive = true;
  }

  start() {
    this.spawnGoblin();
  }

  spawnGoblin() {
    if (!this.gameActive) return;

    const cell = this.board.randomCell;

    this.currentGoblin.reappear(cell);

    if (this.missTimeout) {
      clearTimeout(this.missTimeout);
    }

    this.missTimeout = setTimeout(() => {
      if (this.gameActive) {
        this.miss();
      }
    }, 1000);

    const onClick = () => {
      if (!this.gameActive) return;
      this.onGoblinClick();
      cell.removeEventListener('click', onClick);
    };

    cell.addEventListener('click', onClick);
  }

  onGoblinClick() {
    if (this.missTimeout) {
      clearTimeout(this.missTimeout);
      this.missTimeout = null;
    }

    this.score += 1;
    this.scoreElement.textContent = this.score;

    this.currentGoblin.hide();

    setTimeout(() => {
      if (this.gameActive) {
        this.spawnGoblin();
      }
    }, 500);
  }

  miss() {
    if (!this.gameActive || this.missTimeout === null) return;

    this.missTimeout = null;

    this.misses += 1;
    this.missesElement.textContent = this.misses;

    if (this.misses >= 5) {
      this.endGame();
    } else {
      this.currentGoblin.hide();

      setTimeout(() => {
        if (this.gameActive) {
          this.spawnGoblin();
        }
      }, 500);
    }
  }

  endGame() {
    this.gameActive = false;
    if (this.missTimeout) {
      clearTimeout(this.missTimeout);
    }
    this.currentGoblin.hide();
    alert(`Игра окончена! Ваш счёт: ${this.score}`);
  }
}