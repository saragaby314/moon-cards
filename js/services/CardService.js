import Card from "../models/Card.js";

export default class CardService {

  static getCardFromRow(row) {
    const ch = row.character;
    const card = new Card(ch.mal_id, ch.name, ch.images.jpg.image_url);
    return card;
  }

  static getCardsFromRawData(data) {
    const cards = new Map();
    for(let row of data){
      const card = this.getCardFromRow(row);
      cards.set(card.id, card);
    }
    return cards;
  }
  
// 1 crear un div
  static renderCard(card){
    const newCard = document.createElement('div');
    newCard.className  = 'card';
    newCard.dataset.id = card.id;

    newCard.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">
          <img
            src="${card.imageUrl}"
            alt="${card.name}"
          />
        </div>
      </div>
    `;
    return newCard;

  }
}




