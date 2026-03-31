export default class User {
  constructor(name, email, password) {
  
    if (!name || name.trim() === "") {
      throw new Error("El nombre no puede estar vacío");
    }

    if (!email || !email.includes("@")) {
      throw new Error("El email es inválido");
    }

    if (!password || password.length < 6) {
      throw new Error("La contraseña debe tener por lo menos 6 caracteres");
    }

    this.name = name.trim();
    this.email = email.trim();
    this.password = password;
  }

  save() {
    const data = JSON.stringify(this);
    localStorage.setItem("user", data);
  }

  static load() {
    const data = localStorage.getItem("user");
    if (!data) return null; 

    try {
      const obj = JSON.parse(data);
      return new User(obj.name, obj.email, obj.password);
    } catch (error) {
      console.error("Error al cargar el usuario desde localStorage:", error);
      return null;
    }
  }
}