export default class ApiService {

  static BASE_URL = "https://api.jikan.moe/v4";

  static async getCharacters() {

    const endpoint = "/anime/31733/characters"; 
    
    const url = `${this.BASE_URL}${endpoint}`;

    const response = await fetch(url);

    if (!response.ok) {

      throw new Error(`Error al obtener personajes: ${response.status}`);
    }

    const json = await response.json();

    return json.data; 
  }
}