import Card from "./Card.js";
import CardService from "../services/CardService.js";

export default class Board {
  constructor(container) {
    this.container = container;
    this.cards = new Map();
    this.selectedHueco = null;
  }
  restart(){
    this.container.innerHTML=``;
    this.cards = new Map();
    this.selectedHueco = null;
  }
  render(){
    const boardElement = document.createElement('div');
    boardElement.className  = 'board';
    boardElement.dataset.id = "board";

    boardElement.innerHTML = `
      
    `;
    let hueco = 0;
    this.cards.forEach((card)=>{
        let cardElement= card.createDomElement();
        boardElement.appendChild(cardElement);
        cardElement.addEventListener("click",(event)=>{
            let idCarta = event.target.dataset.id;  
            let hueco = event.target.parentElement.parentElement.parentElement.dataset.hueco;
            if(hueco ==null){
                hueco = event.target.dataset.hueco;
            }
            this.click(hueco,idCarta);
        });
        cardElement.dataset.hueco=hueco;
        hueco++;
    });
    this.container.appendChild(boardElement);
  }
  showCardFromHueco(hueco){
    let elem = document.querySelector(`[data-hueco="${hueco}"] .card-inner`);
    let card = this.cards[hueco];
    elem.classList.remove("hidden");
    card.isHidden = false;
    
  }
  hideCardFromHueco(hueco){
    let elem = document.querySelector(`[data-hueco="${hueco}"] .card-inner`);
    let card = this.cards[hueco];
    elem.classList.add("hidden");
    card.isHidden = true;
  }
  async click(hueco,idCard){
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    this.showCardFromHueco(hueco);
    
    if(this.selectedHueco == null && this.selectedHueco!=hueco){
        this.selectedHueco = hueco;
    }else if(this.selectedHueco!=hueco){
        await sleep(300);
        let firstCard = this.cards[this.selectedHueco];
        let secondCard = this.cards[hueco];
        if(firstCard.id == secondCard.id){
            if(this.comprobarFinJuego()){
                alert("Victoria!!!");
                location.reload();
            }
        }else{
            this.hideCardFromHueco(this.selectedHueco);
            this.hideCardFromHueco(hueco);
        }

        console.dir(this.cards);
       
        this.selectedHueco=null;
    }
    

  }
  
  comprobarFinJuego(){
    let isFin = true;
    this.cards.forEach((card)=>{
        if(card.isHidden){
            isFin = false;
        }
    });
    return isFin;
  }
  
  prepareCards(cards) {
    // 1. Map → array y coge solo 6
    const selected = Array.from(cards.values()).slice(0, 6);

    // 2. Duplica para crear parejas
    const pairs = [...selected, ...selected];

    // 3. Baraja
    return pairs.sort(() => Math.random() - 0.5);
  }
}