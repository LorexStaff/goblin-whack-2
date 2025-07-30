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

    this.modal = document.getElementById('modal');
    this.finalScoreElement = document.getElementById('final-score');
    this.restartButton = document.getElementById('restart-button');

    this.restartButton.addEventListener('click', () => {
      this.reset();
      this.modal.classList.add('hidden');
    });
  }

  start() {
    this.board.onCellClick((cell) => this.onCellClick(cell));
    this.spawnGoblin();
  }

  onCellClick(cell) {
    if (!this.gameActive) return;

    if (cell.contains(this.currentGoblin.element)) {
      this.onGoblinHit();
    } else {
      this.onMissClick();
    }
  }

  spawnGoblin() {
    if (!this.gameActive) return;

    const previousCell = this.currentGoblin.currentCell;
    const cell = previousCell
      ? this.board.randomCellExcept(previousCell)
      : this.board.randomCell;

    this.currentGoblin.show(cell);

    this.missTimeout = setTimeout(() => {
      this.missTimeout = null;
      if (this.gameActive) {
        this.onMissTimeout();
      }
    }, 1000);
  }

  onGoblinHit() {
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

  onMissClick() {
    if (this.missTimeout && this.gameActive) {
      clearTimeout(this.missTimeout);
      this.missTimeout = null;
      this.onMiss();
    }
  }

  onMissTimeout() {
    this.currentGoblin.hide();

    this.misses += 1;
    this.missesElement.textContent = this.misses;

    if (this.misses >= 5) {
      this.endGame();
    } else {
      setTimeout(() => {
        if (this.gameActive) {
          this.spawnGoblin();
        }
      }, 500);
    }
  }

  onMiss() {
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
    this.finalScoreElement.textContent = this.score;
    this.modal.classList.remove('hidden');
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    this.scoreElement.textContent = '0';
    this.missesElement.textContent = '0';
    this.gameActive = true;
    this.missTimeout = null;
    this.currentGoblin.hide();
    this.spawnGoblin();
  }
}
