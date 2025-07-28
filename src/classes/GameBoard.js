export default class GameBoard {
  constructor() {
    this.container = document.getElementById('game-board');
    this.cells = [];
    this.createBoard();
  }

  createBoard() {
    for (let i = 0; i < 16; i += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      this.container.appendChild(cell);
      this.cells.push(cell);
    }
  }

  get randomCell() {
    return this.cells[Math.floor(Math.random() * this.cells.length)];
  }
}
