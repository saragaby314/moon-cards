import Card from "../models/Card.js";

export default class CardService {

  static getCardFromRawData(rawData, id) {
    if (!rawData) {
      throw new Error("No hay datos para crear la carta");
    }

    if (!rawData.name) {
      throw new Error("El personaje no tiene nombre");
    }

    if (!rawData.images || !rawData.images.jpg || !rawData.images.jpg.image_url) {
      throw new Error("El personaje no tiene imagen disponible");
    }

    const card = new Card(
      id,                       
      rawData.name,             
      rawData.images.jpg.image_url, 
      true                      
    );

    return card;
  }
}
