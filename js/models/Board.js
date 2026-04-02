import Card from "./Card.js";
import CardService from "../services/CardService.js";

export default class Board {
  constructor(container) {
    this.container = container;
    this.cards = new Map();
  }
  render(){
    const boardElement = document.createElement('div');
    boardElement.className  = 'board';
    boardElement.dataset.id = "board";

    boardElement.innerHTML = `
      <h2>UAHAHAHHAHAHA</h2>
    `;
    this.container.appendChild(boardElement);

  }
  
  prepareCards(cards) {
    // 1. Map → array y coge solo 6
    const selected = Array.from(cards.values()).slice(0, 6);

    // 2. Duplica para crear parejas
    const pairs = [...selected, ...selected];

    // 3. Baraja
    return pairs.sort(() => Math.random() - 0.5);
  }
}