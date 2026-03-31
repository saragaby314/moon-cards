export default class Card {
  constructor(id, name, urlImage, isHidden = true) {

    if (!id) {
      throw new Error("El ID de la carta no puede estar vacío");
    }

    if (!name || name.trim() === "") {
      throw new Error("El nombre de la carta no puede estar vacío");
    }

    if (!urlImage || typeof urlImage !== "string") {
      throw new Error("La carta debe tener una URL de imagen válida");
    }

    if (typeof isHidden !== "boolean") {
      throw new Error("isHidden debe ser un valor booleano, true o false");
    }

    this.id = id;
    this.name = name.trim();
    this.urlImage = urlImage;
    this.isHidden = isHidden; 
  }

  show() {
    this.isHidden = false;
  }

  hide() {
    this.isHidden = true;
  }

  save() {
    const data = JSON.stringify(this);
    localStorage.setItem(`card-${this.id}`, data);
  }

  static load(id) {
    const data = localStorage.getItem(`card-${id}`);
    if (!data) return null;

    try {
      const obj = JSON.parse(data);
      return new Card(obj.id, obj.name, obj.urlImage, obj.isHidden);
    } catch (error) {
      console.error("Error al cargar la carta desde localStorage:", error);
      return null;
    }
  }
}