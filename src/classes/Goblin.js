import goblinImg from '../assets/goblin.png';

export default class Goblin {
  constructor() {
    this.element = document.createElement('img');
    this.element.src = goblinImg;
    this.element.alt = 'Гоблин';
    this.element.className = 'goblin';
  }

  show(cell) {
    cell.appendChild(this.element);
  }

  hide() {
    document.body.appendChild(this.element);
    this.element.style.display = 'none';
  }

  reappear(cell) {
    this.element.style.display = 'block';
    cell.appendChild(this.element);
  }
}