# Moon Cards

**Juego interactivo de memoria basado en el anime Sailor Moon, desarrollado con HTML5, CSS3 y JavaScript Vanilla, usando programación orientada a objetos.**

![Version](https://img.shields.io/badge/version-0.1.0-yellow?style=flat)
![Status](https://img.shields.io/badge/status-En%20desarrollo-orange?style=flat)
---

## Descripción del Proyecto

Moon Cards es una aplicación web que combina un **juego clásico de memoria** con personajes del anime Sailor Moon. Los usuarios pueden registrarse, iniciar sesión y jugar a un juego de parejas donde el objetivo es encontrar todas las cartas coincidentes.

### Características Principales

- **Sistema de autenticación** con registro e inicio de sesión simulado (localStorage)
- **API integrada** que obtiene personajes de Sailor Moon desde Jikan API
- **Filtrado dinámico** de personajes por popularidad
- **Juego de memoria** con 12 cartas (6 parejas)
- **Interfaz responsiva** y sencilla
- **Arquitectura POO** con clases bien definidas y reutilizables

---

## Cómo Jugar

1. **Registrarse o Iniciar Sesión**
   - Crea una nueva cuenta con tu nombre de usuario, email y contraseña
   - O usa la cuenta de prueba: **Saray** / **123456**

2. **Configurar el Juego**
   - Activa el filtro "Only popular", solo personajes con ≥500 favoritos
   - Las cartas se cargan automáticamente desde la API de Jikan.

3. **Jugar**
   - Haz clic en una carta para voltearla
   - Haz clic en una segunda carta
   - Si coinciden, se quedan boca arriba
   - Si no coinciden, se ocultan de nuevo
   - Encuentra todas las 6 parejas para ganar

4. **Repetir**
   - Al ganar, recarga la página para jugar de nuevo
   - Cierra sesión con el botón "Logout"

---

## Instalación y Despliegue

### Requisitos
- Navegador moderno (Chrome, Firefox, Opera mini, etc.)
- Conexión a internet (para la API de Jikan)

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/saragaby314/moon-cards.git
   cd moon-cards
   ```

2. **Opción A: Usa Live Server (VSCode)**
   - Abre el proyecto en VSCode
   - Click derecho en `index.html` → "Open with Live Server"
   - La aplicación se abrirá en `http://localhost:5501`

3. **Opción B: Abre directamente en el navegador**
   - Haz doble clic en `index.html`
   - O arrastra el archivo al navegador

### Estructura de Carpetas

```
moon-cards/
├── index.html          # Archivo HTML principal
├── assets/
│   ├── favicon.ico     # Icono del sitio
│   └── logo.png        # Logo de Moon Cards
├── css/
│   ├── app.css         # Estilos principales
│   └── form.css        # Estilos de formularios
├── js/
│   ├── models/
│   │   ├── Board.js    # Clase Board - gestiona el tablero
│   │   ├── Card.js     # Clase Card - define una carta
│   │   └── User.js     # Clase User - gestiona usuarios
│   └── services/
│       ├── ApiService.js     # Servicio para llamadas API
│       ├── CardService.js    # Servicio de gestión de cartas
│       └── UserService.js    # Servicio de usuarios
└── README.md           # Descripción del proyecto
```

---

## Tecnologías Utilizadas

| Tecnología | Uso |
|-----------|-----|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Estructura y marcado semántico |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Estilos y diseño responsivo |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Lógica de la aplicación |
| ![Jikan API](https://img.shields.io/badge/Jikan_API-ff69b4?style=flat) | Datos de personajes de Sailor Moon |
| ![localStorage](https://img.shields.io/badge/localStorage-333333?style=flat&logo=webstorage&logoColor=white) | Almacenamiento local de usuarios |

### API Externa

**Jikan API v4** - API gratuita de anime
- Endpoint: `https://api.jikan.moe/v4/anime/31733/characters`
- Anime: Sailor Moon (ID: 31733)
- Datos obtenidos: ID, nombre, imagen

---

## Arquitectura y Conceptos POO

### Diagrama de Clases

```
┌─────────────────────┐
│      User           │
├─────────────────────┤
│ - name: string      │
│ - email: string     │
│ - password: string  │
├─────────────────────┤
│ + save()            │
│ + load()            │
└─────────────────────┘
         │ usa
         │
    ┌────────────────────────────────┐
    │       UserService              │
    ├────────────────────────────────┤
    │ + saveUser(user)               │
    │ + loadUser(userName)           │
    │ + login(name, password)        │
    │ + logout()                     │
    │ + getActualLogin()             │
    └────────────────────────────────┘

┌─────────────────────────┐
│        Card             │
├─────────────────────────┤
│ - id: number            │
│ - name: string          │
│ - imageUrl: string      │
│ - isHidden: boolean     │
├─────────────────────────┤
│ + show()                │
│ + hide()                │
│ + createDomElement()    │
└─────────────────────────┘
         │ contiene
         │
    ┌────────────────────────────────┐
    │        Board                   │
    ├────────────────────────────────┤
    │ - container: DOM               │
    │ - cards: Map<id, Card>         │
    │ - selectedHueco: int           │
    ├────────────────────────────────┤
    │ + render()                     │
    │ + click(hueco, idCard)         │
    │ + prepareCards(cards)          │
    │ + comprobarFinJuego()          │
    │ + showCardFromHueco(hueco)     │
    │ + hideCardFromHueco(hueco)     │
    └────────────────────────────────┘

┌─────────────────────────────┐
│     ApiService              │
├─────────────────────────────┤
│ - BASE_URL: string          │
├─────────────────────────────┤
│ + getCharacters(): Promise  │
└─────────────────────────────┘
         │ obtiene datos de
         │
    ┌────────────────────────────────┐
    │     CardService                │
    ├────────────────────────────────┤
    │ + getCardFromRow(row)          │
    │ + getCardsFromRawData(data)    │
    └────────────────────────────────┘
```

### Principios POO Implementados

1. **Encapsulación**
   - Cada clase tiene sus propiedades privadas y métodos públicos
   - Las validaciones ocurren en los constructores

2. **Abstracción**
   - Las clases de servicio (`UserService`, `CardService`, `ApiService`) abstraen la lógica
   - El `index.html` no conoce los detalles internos

3. **Reutilización**
   - Las clases pueden instanciarse múltiples veces
   - Métodos estáticos en servicios para funcionalidad compartida

4. **Separación de Responsabilidades**
   - `User` - gestiona datos de usuario
   - `Card` - gestiona una carta individual
   - `Board` - gestiona el tablero completo
   - `Services` - manejan la lógica de negocio

---

## Flujo de la Aplicación

### Inicio
1. El navegador carga `index.html`
2. Se inicializa la aplicación con `initApp()`
3. Se verifica si hay un usuario logeado en localStorage

### Flujo de Autenticación

**Nuevos Usuarios:**
```
Login Panel → Clic en "Registro"
           → SignUp Panel → Llenar formulario
           → UserService.saveUser()
           → UserService.login()
           → Recargar página
           → Mostrar Board
```

**Usuarios Existentes:**
```
Login Panel → Llenar credenciales
           → UserService.login()
           → Recargar página
           → Mostrar Board
```

### Flujo del Juego

```
1. initPanelBoard() ejecuta:
   - ApiService.getCharacters() → obtiene datos de Jikan
   - Si filtro activo → filtra por popularidad (≥500)
   - CardService.getCardsFromRawData() → crea objetos Card
   - Board.prepareCards() → duplica y baraja cartas

2. Board.render() → crea elementos DOM para cada carta

3. Eventos click en cartas:
   - Board.click(hueco, idCard)
   - Muestra la primera carta
   - Si hay una segunda: compara IDs
   - Si coinciden: se quedan visibles
   - Si no coinciden: se ocultan después de 300ms
   - Si todas coinciden: alerta de victoria y recarga

4. logout() → limpia localStorage y recarga
```

---

## Validación de Datos

### Usuario
- **Nombre**: No vacío, trimmed
- **Email**: Debe contener "@"
- **Contraseña**: Mínimo 6 caracteres

### Carta
- **ID**: No puede estar vacío
- **Nombre**: No vacío, trimmed
- **imageUrl**: Debe ser string válido
- **isHidden**: Debe ser boolean

Todas las validaciones lanzan errores descriptivos si fallan.

---

## Manejo de Estado

### localStorage
```javascript
// Usuario registrado
localStorage.setItem("Saray", JSON.stringify(userObject))

// Usuario logeado actualmente
localStorage.setItem("currentUser", JSON.stringify(userObject))
```

### Estado Global
```javascript
// En index.html
const board = new Board(panelBoard)
let currentUser = UserService.getActualLogin()
```

---

## Créditos

- ![API](https://img.shields.io/badge/Jikan_API-ff69b4?style=flat) **Jikan API** – Datos de personajes de anime
- ![Anime](https://img.shields.io/badge/Sailor_Moon-FFD700?style=flat) **Sailor Moon** – Toei Animation
- ![Inspiración](https://img.shields.io/badge/Inspiración-Juegos_Memoria-1E90FF?style=flat) Juegos clásicos de memoria