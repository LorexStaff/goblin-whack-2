import goblinImg from '../assets/goblin.png';

export default class Goblin {
  constructor() {
    this.element = document.createElement('img');
    this.element.src = goblinImg;
    this.element.alt = 'Гоблин';
    this.element.className = 'goblin';
    this.currentCell = null;
  }

  show(cell) {
    if (this.currentCell) {
      this.hide();
    }
    cell.append(this.element);
    this.currentCell = cell;
  }

  hide() {
    if (this.element.parentElement) {
      this.element.remove();
    }
    this.currentCell = null;
  }
}
