# Moon Cards

**Juego interactivo de memoria basado en el anime Sailor Moon, desarrollado con HTML5, CSS3 y JavaScript Vanilla, usando programación orientada a objetos.**

![Version](https://img.shields.io/badge/version-0.1.0-blue?style=flat)
![Status](https://img.shields.io/badge/status-completed-brightgreen?style=flat)

---

## Descripción del Proyecto

Moon Cards es una aplicación web que combina un **juego clásico de memoria** con personajes del anime Sailor Moon. Los usuarios pueden registrarse, iniciar sesión y jugar a un juego de parejas donde el objetivo es encontrar todas las cartas coincidentes.

### Características Principales

- **Sistema de autenticación** con registro e inicio de sesión (localStorage)
- **API integrada** que obtiene personajes de Sailor Moon desde Jikan API
- **Filtrado dinámico** de personajes por popularidad (≥500 favoritos)
- **Juego de memoria** con 12 cartas (6 parejas)
- **Interfaz responsiva** y sencilla
- **Arquitectura** con clases reutilizables

---

## Cómo Jugar

1. **Registrarse o Iniciar Sesión**
   - Crea una nueva cuenta con tu nombre de usuario, email y contraseña
   - O usa la cuenta de prueba: **Saray** / **123456**

2. **Configurar el Juego**
   - Activa el filtro "Only popular" para ver solo personajes con ≥500 favoritos
   - Las cartas se cargan automáticamente desde la API de Jikan

3. **Jugar**
   - Haz clic en una carta para voltearla
   - Haz clic en una segunda carta
   - Si coinciden, se quedan boca arriba
   - Si no coinciden, se ocultan de nuevo tras 300ms
   - Encuentra todas las 6 parejas para ganar

4. **Repetir**
   - Al ganar, la página se recarga automáticamente para jugar de nuevo
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
├── index.html               # Archivo HTML principal y controlador de la app
├── assets/
│   ├── favicon.ico
│   ├── logo.png
│   ├── diagrama_flujo.svg
│   └── diagrama_UML.svg
├── css/
│   ├── app.css              # Estilos principales
│   └── form.css             # Estilos de formularios
├── js/
│   ├── models/
│   │   ├── Board.js         # Clase Board: gestiona el tablero
│   │   ├── Card.js          # Clase Card: define una carta
│   │   └── User.js          # Clase User: gestiona usuarios
│   └── services/
│       ├── ApiService.js    # Servicio para llamadas a la API
│       ├── CardService.js   # Servicio de transformación de cartas
│       └── UserService.js   # Servicio de autenticación y gestión de usuarios
├── Memoria_tecnica.md       # Documentación técnica del proyecto
└── README.md                # Documentación general del proyecto
```

---

## Tecnologías Utilizadas

| Tecnología | Uso |
|-----------|-----|
| [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML) | Estructura y marcado |
| [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS) | Estilos y diseño responsivo |
| [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript) | Lógica de la aplicación |
| [![Jikan API](https://img.shields.io/badge/Jikan_API-ff69b4?style=flat)](https://jikan.moe/) | Datos de personajes de Sailor Moon |
| [![localStorage](https://img.shields.io/badge/localStorage-333333?style=flat)](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage) | Almacenamiento local de usuarios y sesión |

### API Externa

**Jikan API v4** — API gratuita de anime
- Endpoint: `https://api.jikan.moe/v4/anime/31733/characters`
- Anime: Sailor Moon Crystal (ID: 31733)
- Datos obtenidos: `mal_id`, nombre, imagen (`images.jpg.image_url`), favoritos

---

## Arquitectura

### Diagrama de Clases

```
┌─────────────────────┐
│        User         │
├─────────────────────┤
│ - name: string      │
│ - email: string     │
│ - password: string  │
├─────────────────────┤
│ + save()            │
│ + static load()     │
└─────────────────────┘
         │ usa
         ▼
┌────────────────────────────────┐
│         UserService            │
├────────────────────────────────┤
│ + static saveUser(user)        │
│ + static loadUser(userName)    │
│ + static login(name, password) │
│ + static logout()              │
│ + static getActualLogin()      │
└────────────────────────────────┘

┌─────────────────────────┐
│          Card           │
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
         ▼
┌────────────────────────────────┐
│            Board               │
├────────────────────────────────┤
│ - container: HTMLElement       │
│ - cards: Array<Card>           │
│ - selectedHueco: int | null    │
├────────────────────────────────┤
│ + restart()                    │
│ + render()                     │
│ + async click(hueco, idCard)   │
│ + prepareCards(cards): Array   │
│ + comprobarFinJuego(): boolean │
│ + showCardFromHueco(hueco)     │
│ + hideCardFromHueco(hueco)     │
└────────────────────────────────┘

┌─────────────────────────────┐
│        ApiService           │
├─────────────────────────────┤
│ - static BASE_URL: string   │
├─────────────────────────────┤
│ + static getCharacters()    │
└─────────────────────────────┘
         │ obtiene datos de
         ▼
┌────────────────────────────────────────┐
│             CardService                │
├────────────────────────────────────────┤
│ + static getCardFromRow(row): Card     │
│ + static getCardsFromRawData(data): Map│
└────────────────────────────────────────┘
```

### Implementación de Board

`Board` almacena las cartas en un **Array indexado por hueco** (posición en el tablero). La propiedad `this.cards` es asignada mediante `board.cards = board.prepareCards(cards)`, donde `prepareCards` devuelve un array barajado. Los métodos `showCardFromHueco` y `hideCardFromHueco` acceden a `this.cards[hueco]` directamente por índice.

---

## Flujo de la Aplicación

```
Carga index.html
     ↓
initApp()
     ↓
¿currentUser en localStorage?
     ├─ Sí → mostrar panelBoard + panelUsuario → initPanelBoard()
     │             ↓
     │        ApiService.getCharacters()
     │             ↓
     │        (opcional) filtrar por favoritos ≥ 500
     │             ↓
     │        CardService.getCardsFromRawData() → Map<Card>
     │             ↓
     │        Board.prepareCards() → Array barajado (12 cartas)
     │             ↓
     │        Board.render() → elementos DOM con event listeners
     │
     └─ No → mostrar loginPanel
                  ↓
             Usuario elige:
                  ├─ Login → UserService.login() → location.reload()
                  └─ Registro → UserService.saveUser() → login() → reload()
```

---

## Manejo de Estado

### localStorage

```javascript
// Guardar usuario registrado (clave = nombre de usuario)
localStorage.setItem("Saray", JSON.stringify(userObject))

// Usuario con sesión activa
localStorage.setItem("currentUser", JSON.stringify(userObject))
```

### Estado Global (en index.html)

```javascript
const board = new Board(panelBoard)   // instancia única del tablero
let currentUser = UserService.getActualLogin()
```

---

## Créditos

[![API](https://img.shields.io/badge/Jikan_API-ff69b4?style=flat)](https://jikan.moe/) **Jikan API** — Datos de personajes de anime

[![Anime](https://img.shields.io/badge/Sailor_Moon-FFD700?style=flat)](https://es.wikipedia.org/wiki/Sailor_Moon) **Sailor Moon** — Toei Animation

[![Inspiración](https://img.shields.io/badge/Inspiración-Sailor_Moon_Fan-FF5C8D?style=flat)](https://myanimelist.net/anime/530/Bishoujo_Senshi_Sailor_Moon) **Inspiración personal** — Mi anime favorito de la infancia. Quería hacer un proyecto técnico con algo que me importa muchísimo.