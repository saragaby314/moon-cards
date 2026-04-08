import User from "../models/User.js"

export default class UserService {
  
  static saveUser(user){
    try{
      localStorage.setItem(user.name , JSON.stringify(user));
    }catch(ex){
      console.log("Error al guardar el usuario");
    }
    
  }
  
  static loadUser(userName){
    let usuario;
    try{
      usuario = localStorage.getItem(userName);
      usuario = JSON.parse(usuario);
      usuario = new User(usuario.name, usuario.email, usuario.password);
    }catch(ex){
      usuario = null;
      console.log("Error al recuperar el usuario");
    }
    return usuario;
  }

  static login(userName, password) {
    let user = this.loadUser(userName);

    if(user==null){
      return null;
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
    let user = null;
    let data = localStorage.getItem("currentUser");
    data =  JSON.parse(data);
    if(data!=null){
      user = new User(data.name, data.email, data.password);
    }
    return user;
  }

}