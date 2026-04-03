# Memoria Técnica - Moon Cards

**Juego de Memoria con JavaScript Vanilla y POO**

---

## Contenido

1. [Introducción](#introducción)
2. [Objetivos del Proyecto](#objetivos-del-proyecto)
3. [Arquitectura de la Aplicación](#arquitectura-de-la-aplicación)
4. [Implementación](#implementación)
5. [Pruebas y Validación](#pruebas-y-validación)
6. [Gestión del Proyecto](#gestión-del-proyecto)
7. [Desafíos y Soluciones](#desafíos-y-soluciones)
8. [Conclusiones](#conclusiones)

---

## Introducción

**Moon Cards** es una aplicación web sencilla que integra conceptos fundamentales de desarrollo web moderno: JavaScript orientado a objetos, manipulación del DOM, consumo de APIs externas, y gestión del almacenamiento local.

**Objetivo académico**: Demostrar comprensión de POO, asincronía, patrones de diseño y buenas prácticas de desarrollo web.

---

## Objetivos del Proyecto

### Objetivos Funcionales
1. Crear un juego de memoria con 12 cartas (6 parejas)
2. Implementar un sistema de autenticación de usuarios
3. Integrar una API externa para obtener datos dinámicos
4. Permitir un filtrado de contenido 
5. Guardar estado de sesión de usuario en localStorage

### Objetivos Técnicos
1. Aplicar principios de Programación Orientada a Objetos (POO)
2. Separar lógica de presentación usando patrones de servicio
3. Manejar promesas y operaciones asincrónicas
4. Validar datos de entrada
5. Crear interfaz responsiva 

### Objetivos de Aprendizaje
1. Entender ciclo de vida de una aplicación web
2. Dominar manipulación del DOM
3. Implementar arquitectura escalable
4. Documentación técnica

---

## Arquitectura de la Aplicación

### 1. Patrón Arquitectónico: MVC Simplificado

```
┌─────────────────────────────────────────────────┐
│              index.html (Vista)                  │
│  - Paneles: Login, Registro, Board, Usuario      │
│  - Elementos DOM que se manipulan dinámicamente │
└──────────────────┬──────────────────────────────┘
                   │ manipula
                   ↓
┌─────────────────────────────────────────────────┐
│          Controlador (index.html script)        │
│  - initApp(), initPanelBoard(), initPanelLogin │
│  - Gestiona flujo de la aplicación              │
└──────────────────┬──────────────────────────────┘
                   │ utiliza
                   ↓
┌──────────────────────────────────────────────────────────────┐
│                      Modelos + Servicios                      │
├──────────────────────────────────────────────────────────────┤
│ Models:                                                        │
│  ├─ User (name, email, password)                             │
│  ├─ Card (id, name, imageUrl, isHidden)                     │
│  └─ Board (container, cards, selectedHueco)                 │
│                                                                │
│ Services:                                                      │
│  ├─ UserService (save, load, login, logout)                 │
│  ├─ CardService (getCardFromRow, getCardsFromRawData)       │
│  └─ ApiService (getCharacters)                               │
└─────────────────────────────────────────────────────────────┘
```

![Diagrama de arquitectura](assets/diagrama_UML.svg)

![Diagrama de arquitectura](assets/diagrama_flujo.svg)

### 2. Capas de la Aplicación

#### Capa de Presentación (UI)
- `index.html`: Estructura y elementos del DOM
- `css/app.css`: Estilos principales
- `css/form.css`: Estilos de formularios

#### Capa de Lógica (Controllers/Services)
- `UserService.js`: Gestión de usuarios y autenticación
- `CardService.js`: Transformación de datos de API → Card objects
- `ApiService.js`: Comunicación con Jikan API

#### Capa de Modelos (Data)
- `User.js`: Entidad de usuario
- `Card.js`: Entidad de carta individual
- `Board.js`: Entidad que gestiona el tablero

#### Capa de Persistencia
- `localStorage`: Almacenamiento local de usuarios

### 3. Flujo de Datos

```
Inicio App
    ↓
¿Usuario logeado? (localStorage.getItem("currentUser"))
    ├─ Sí → Mostrar Board Panel
    │        ↓
    │     Fetch API (Jikan) → json.data (array de personajes)
    │        ↓
    │     CardService.getCardsFromRawData() → Map<Card>
    │        ↓
    │     Board.prepareCards() → Array barajeado
    │        ↓
    │     Board.render() → DOM elements
    │
    └─ No → Mostrar Login Panel
             ↓
          Usuario elige:
             ├─ Login → validar credenciales → savedUser?
             │          Sí → login() → localStorage
             │          No → mostrar error
             │
             └─ Registro → crear usuario → saveUser() → localStorage
```
---

## Implementación

### 1. Estructura de Archivos

```
js/
├── models/
│   ├── User.js          
│   ├── Card.js          
│   └── Board.js         
└── services/
    ├── UserService.js  
    ├── CardService.js 
    └── ApiService.js   

css/
├── app.css              
└── form.css             

assets/
├── favicon.ico
└── logo.png

index.html             
```

### 2. Patrones Implementados

#### Patrón Singleton (Servicios)
```javascript
// UserService.js
export default class UserService {
  static saveUser(user) { ... }     
  static login(name, password) { ... }
}

// Uso: sin instanciar
UserService.login("Saray", "123456")
```

**Ventaja**: Evita múltiples instancias innecesarias

#### Patrón Factory (CardService)
```javascript
// CardService.js
static getCardFromRow(row) {
  const ch = row.character
  return new Card(ch.mal_id, ch.name, ch.images.jpg.image_url)
}
```

**Ventaja**: Encapsula lógica de creación

#### Patrón Observer (Eventos)
```javascript
// Board.js
cardElement.addEventListener("click", (event) => {
  this.click(hueco, idCarta)
})
```

**Ventaja**: Desacoplamiento entre UI y lógica

### 3. Manejo de Asincronía

```javascript
// ApiService.js
async static getCharacters() {
  const response = await fetch(url)
  if (!response.ok) throw new Error(...)
  const json = await response.json()
  return json.data
}

// Uso en initPanelBoard()
let data = await ApiService.getCharacters()
```

**Características**:
- Usa async/await 
- Manejo de errores con try-catch implícito
- Promise-based

### 4. Validaciones Implementadas

#### En User.js
```javascript
constructor(name, email, password) {
  if (!name || name.trim() === "") 
    throw new Error("El nombre no puede estar vacío")
  if (!email || !email.includes("@"))
    throw new Error("El email es inválido")
  if (!password || password.length < 6)
    throw new Error("La contraseña debe tener por lo menos 6 caracteres")
}
```

#### En Card.js
```javascript
constructor(id, name, imageUrl, isHidden = true) {
  if (!id) throw new Error("El ID de la carta no puede estar vacío")
  if (!name || name.trim() === "") 
    throw new Error("El nombre de la carta no puede estar vacío")
  if (!imageUrl || typeof imageUrl !== "string")
    throw new Error("La carta debe tener una URL de imagen válida")
  if (typeof isHidden !== "boolean")
    throw new Error("isHidden debe ser un valor booleano")
}
```

### 5. Generación de Elementos DOM

```javascript
// Card.js - createDomElement()
createDomElement() {
  const newCard = document.createElement('div')
  newCard.className = 'card'
  newCard.dataset.id = this.id
  
  newCard.innerHTML = `
    <div data-id="${this.id}" class="card-inner ${hidden}">
      <div data-id="${this.id}" class="card-front"></div>
      <div data-id="${this.id}" class="card-back">
        <img src="${this.imageUrl}" alt="${this.name}" />
      </div>
    </div>
  `
  return newCard
}
```

**Ventaja**: DOM generado programáticamente es más flexible

---

## Pruebas y Validación

### 1. Pruebas Funcionales Manuales

| Test | Entrada | Salida Esperada | Resultado |
|------|---------|-----------------|-----------|
| Login válido | Saray / 123456 | Acceso al board | Pasa |
| Login inválido | User / wrong | Error | Pasa |
| Registro duplicado | Saray (existe) | Sobrescribe | Pasa |
| Click primera carta | Click en carta 1 | Se voltea | Pasa |
| Click segunda carta coincide | Click en pareja | Ambas permanecen | Pasa |
| Click segunda carta no coincide | Click distinto | Se ocultan | Pasa |
| Filtro popular | ≥500 favoritos | Solo populares | Pasa |
| Logout | Clic Logout | Regresa a Login | Pasa |


### 2. Pruebas de Validación de Datos

```javascript
// User.js validation
try {
  new User("", "test@test.com", "123456")  // Error: nombre vacío
} catch (e) {
  console.log(e.message) // "El nombre no puede estar vacío"
}

try {
  new User("Test", "invalidemail", "123456") // Error: email inválido
} catch (e) {
  console.log(e.message) // "El email es inválido"
}
```

### 3. Pruebas de API

```javascript
// Verificar respuesta de Jikan
fetch('https://api.jikan.moe/v4/anime/31733/characters')
  .then(r => r.json())
  .then(data => {
    console.log(data.data.length) // Debe ser > 0
    console.log(data.data[0].character.name) // Nombre de personaje
    console.log(data.data[0].character.images.jpg.image_url) // URL imagen
  })
```

---

## Gestión del Proyecto

### Metodología

#### Fase 1: Planificación 
- Definir requisitos
- Diseñar arquitectura

#### Fase 2: Desarrollo de Modelos 
- Implementar User.js
- Implementar Card.js
- Implementar Board.js
- Crear servicios

#### Fase 3: Integración UI 
- HTML y CSS base
- Conectar eventos
- Integrar API
- Sistema de autenticación

#### Fase 4: Pruebas 
- Pruebas funcionales
- Validaciones
- Documentación
- Optimización

### Herramientas Utilizadas

- **Editor**: Visual Studio Code
- **Versionado**: Git
- **Repositorio**: GitHub
- **Servidor Local**: Live Server (VSCode)
- **Navegadores Probados**: Chrome, Firefox y Opera mini.

---

## Desafíos y Soluciones

### Desafío 1: Manejo de Map vs índices de array

**Problema**: Board usa Map <id, Card> pero necesita acceder por hueco (0-11)

**Solución Implementada**:
```javascript
// Guardar referencia al hueco en el dataset del elemento
cardElement.dataset.hueco = hueco

// Recuperar con:
let hueco = event.target.dataset.hueco
let card = this.cards.get(idCarta)
```

**Lección**: Mezclar índices de posición con IDs de identidad requiere mapeo explícito

### Desafío 2: Timing en comparación de cartas

**Problema**: Las cartas se ocultaban tan rápido que el usuario no las veía

**Solución Implementada**:
```javascript
async click(hueco, idCard) {
  const sleep = (ms) => new Promise(resolve => 
    setTimeout(resolve, ms)
  )
  
  this.showCardFromHueco(hueco)
  
  if(this.selectedHueco != null && this.selectedHueco != hueco) {
    await sleep(300) // Espera 300ms antes de comparar
    // lógica de comparación...
  }
}
```

**Lección**: Los delays en juegos son críticos para UX

### Desafío 3: Validación de email simple

**Problema**: Validación con solo `.includes("@")` es muy débil

**Solución Implementada**:
```javascript
if (!email || !email.includes("@"))
  throw new Error("El email es inválido")
```

**Nota Técnica**: En un hipotético caso que llegase a estar en "producción", usar regex o validador externo:
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### Desafío 4: CORS con API externa

**Problema**: Jikan API requiere manejo de CORS

**Solución**: Jikan permite requests desde navegador (sin CORS preflighting)

**Lección**: Verificar política CORS antes de integrar APIs

### Desafío 5: Estado global sin framework

**Problema**: Múltiples paneles necesitan comunicarse sin framework

**Solución Implementada**:
```javascript
// Variables globales controladas
const board = new Board(panelBoard)
const panelLogin = document.querySelector("#loginPanel")

// Funciones para mostrar/ocultar
function mostrarPanel(panel) { panel.classList.remove("hidden") }
function ocultarPaneles() { [...paneles].forEach(p => p.classList.add("hidden")) }
```

**Lección**: Arquitectura simple pero escalable requiere disciplina

---

## Conclusiones

**La arquitectura importa**, es por eso que separar modelos, servicios y vistas hace el código mantenible

### Posibles mejoras Futuras

- [ ] Contador de intentos
- [ ] Sonidos en eventos
- [ ] Animaciones CSS3
- [ ] Modo oscuro

### Reflexión Final

Moon Cards demuestra que es posible crear una aplicación web sencilla y funcional usando solo JavaScript vanilla. Aunque hoy en día existen frameworks que facilitan muchas cosas, entender bien los fundamentos, como la programación orientada a objetos, es clave para saber realmente lo que está pasando en el código y poder construir proyectos desde cero.

---

## Referencias

- **MDN Web Docs**: https://developer.mozilla.org
- **Jikan API**: https://jikan.moe
- **Sailor Moon Anime**: https://myanimelist.net/anime/31733
- **ES6 Classes**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
- **localStorage API**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage