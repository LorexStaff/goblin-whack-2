export default class GameBoard {
  constructor() {
    this.container = document.getElementById('game-board');
    this.cells = [];
    this.clickHandler = null;
    this.createBoard();
  }

  createBoard() {
    for (let i = 0; i < 16; i += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      this.container.append(cell);
      this.cells.push(cell);
    }
  }

  get randomCell() {
    return this.cells[Math.floor(Math.random() * this.cells.length)];
  }

  randomCellExcept(exceptCell) {
    const available = this.cells.filter((cell) => cell !== exceptCell);
    if (available.length === 0) return exceptCell;
    return available[Math.floor(Math.random() * available.length)];
  }

  onCellClick(handler) {
    this.clickHandler = handler;
    this.cells.forEach((cell) => {
      cell.addEventListener('click', () => handler(cell));
    });
  }
}
