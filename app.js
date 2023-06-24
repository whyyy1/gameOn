
const svgs = [`
<svg xmlns="http://www.w3.org/2000/svg" class="card" face="1B" height="3.5in" preserveAspectRatio="none" viewBox="-120 -168 240 336" width="2.5in"><rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="#ad6b12" stroke="black"></react></svg>`,]


console.log(svgs[0])
const number = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
const suits = ['C', 'S', 'H', 'D']
const deckBtn = document.querySelector('.getDeck')
const dealBtn = document.querySelector('.dealDeck')
const gameTable = document.querySelector('.gameTable')

// const imgA = document.querySelector('.aCard')
// let cardImg = document.createElement('img')
// cardImg.setAttribute('src','cardImages/1B.svg')
// imgA.appendChild(cardImg) 

// function cardImages(name,node){
//     let svg_S = document.createElementNS('http://www.w3.org/2000/svg','svg');
//     svg_S.setAttribute('xmlns',"http://www.w3.org/2000/svg")
//     svg_S.classList.add('card')
//     svg_S.setAttribute('face',name)
//     svg_S.setAttribute('height','3.5in')
//     svg_S.setAttribute('preserveAspectRatio','none')
//     svg_S.setAttribute('viewBox','-120 -168 240 336')
//     svg_S.setAttribute('width','2.5in')

//     let reactSvg = document.createElementNS('http://www.w3.org/2000/svg','react')
     
//     reactSvg.setAttribute('width','239')
//     reactSvg.setAttribute('height','335')
//     reactSvg.setAttribute('x','-119.5')
//     reactSvg.setAttribute('y','-167.5')
//     reactSvg.setAttribute('rx','12')
//     reactSvg.setAttribute('ry','12')
//     reactSvg.setAttribute('fill','#ad6b12')
//     reactSvg.setAttribute('stroke','black')

//     svg_S.appendChild(reactSvg)
//     return node.appendChild(svg_S)
   


// console.log(svg_S)
// game.appendChild(svg_S)
// }

// cardImages('1B',document.querySelector('.aCard'))
class Card {
    constructor(suit, val) {
        this.suit = suit
        this.val = val
    }

}

class Deck {
    constructor() {
        this.deck = []
        this.hands = []
    }
    //get deck function to create the deck
    createDeck() {
        while (this.deck.length < 52) {
            for (let i of suits) {

                for (let j of number) {
                    this.deck.push(new Card(i, j))
                }
            }

        }

        
        
    }

    //randomize deck function to mix it up
    randomizeDeck() {
        
        let tempArr = []

        while (this.deck.length > 0) {
            let randomIndex = Math.floor(Math.random() * this.deck.length)
            tempArr.push(this.deck[randomIndex])
            this.deck.splice(randomIndex, 1)

        }
        
        this.deck = tempArr
        
        
    }

    //deal card function deals a set number of cards updates the array Returns array of hands with cards
    deal(hands, numCards) {
        const allHands = []
        
        let card;
        
        for(let i=0;i< hands;i++){
            allHands.push([])

        }

        for(let cards=0;cards<numCards;cards++){
            for(let hand of allHands){
                
                card = this.deck.shift()
                hand.push(card)
                // console.log(card,hand)
            }
        }
        return allHands
    }

    deckLen(){
        console.log(this.deck.length)
    }

    showWholeDeck(){
        return this.deck
    }


}


let mainDeck = new Deck();

deckBtn.addEventListener('click', (event) => {
    // console.log(deckBtn.style)
    
    if(dealBtn.style.display === 'none' || dealBtn.style.display === ''){
        dealBtn.style.display = 'block';
        deckBtn.textContent = 'RESET'
        

    }else
    {
        dealBtn.style.display = 'none';
        deckBtn.textContent = 'GET SHUFFLED DECK'
        gameTable.innerHTML=''
    }
    

    

})


dealBtn.addEventListener('click',(event) =>{
    mainDeck.createDeck()
    
    mainDeck.randomizeDeck()
    let hands = mainDeck.deal(3,3)
    // console.log(hands)
    let count = 0
    for(let hand of hands){
        let handContaier = document.createElement('div');
        handContaier.innerHTML = `Player${count+1} `;
        handContaier.classList.add('hand', 'hhand-compact', 'active-hand')
        handContaier.style.backgroundColor = 'white';
        handContaier.style.width = '40%';
        handContaier.style.height = '40vh'
        handContaier.style.position = 'relative'
        handContaier.style.alignContent= 'center'
        
        // console.log(hand)
        let handList = ''
        for(let cards of hand){
            let cardVal = document.createElement('img');
            // cardVal.style.position = 'absolute'
            // console.log(cards.val+cards.suit)
            handList+=`${cards.val+cards.suit},`
            cardVal.setAttribute('src',`cards/${cards.val+cards.suit}.svg`)
            cardVal.style.height = '40%';
            cardVal.style.width = '20%';
            handContaier.appendChild(cardVal)
        }
        
        // let cardVal = document.createElement('p');
        // cardVal.classList.add('hand')
        // cardVal.setAttribute('data-hand',`flow: horizonrtal: cards:${handList}`)
        // cardVal.sizes 
        // handContaier.appendChild(cardVal)
        gameTable.appendChild(handContaier)
        count++

    }
    mainDeck.deckLen()
    console.log(mainDeck.deck)
})