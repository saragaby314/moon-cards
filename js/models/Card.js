export default class Card {
  constructor(id, name, imageUrl, isHidden = true) {

    if (!id) {
      throw new Error("El ID de la carta no puede estar vacío");
    }

    if (!name || name.trim() === "") {
      throw new Error("El nombre de la carta no puede estar vacío");
    }

    if (!imageUrl|| typeof imageUrl !== "string") {
      throw new Error("La carta debe tener una URL de imagen válida");
    }

    if (typeof isHidden !== "boolean") {
      throw new Error("isHidden debe ser un valor booleano, true o false");
    }

    this.id = id;
    this.name = name.trim();
    this.imageUrl = imageUrl;
    this.isHidden = isHidden; 
  }

  show() {
    this.isHidden = false;
  }

  hide() {
    this.isHidden = true;
  }
  createDomElement(){
    const newCard = document.createElement('div');
    newCard.className  = 'card';
    newCard.dataset.id = this.id;
    let hidden = "";
    
    if(this.isHidden){
      hidden="hidden";
    }
    
    newCard.innerHTML = `
      <div data-id="${this.id}" class="card-inner ${hidden}">
        <div data-id="${this.id}" class="card-front"></div>
        <div data-id="${this.id}" class="card-back">
          <img
            data-id="${this.id}"
            src="${this.imageUrl}"
            alt="${this.name}"
          />
        </div>
      </div>
    `;
    return newCard;
  }

}