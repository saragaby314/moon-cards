class UserService {
  
  static login(email, password) {
    const user = User.load();

    if (!user) {
      throw new Error("No hay usuario registrado");
    }

    if (user.email !== email) {
      throw new Error("El email no es correcto");
    }

    if (user.password !== password) {
      throw new Error("La contraseña es incorrecta");
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    return user;
  }

  static logout() {
    localStorage.removeItem("currentUser");
  }

  static getActualLogin() {
    const data = localStorage.getItem("currentUser");

    if (!data) return null;

    try {
      const obj = JSON.parse(data);
      return new User(obj.name, obj.email, obj.password);
    } catch (error) {
      console.error("Error al obtener usuario logueado:", error);
      return null;
    }
  }
}