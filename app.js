const gameList = ['game1'];

const number = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
const suits = ['C', 'S', 'H', 'D'];
const deckBtn = document.querySelector('.getDeck');
const dealBtn = document.querySelector('.dealDeck');
const gameTable = document.querySelector('.gameTable');
const gameMenu = document.querySelector('.gameMenu');
const gameSettings = document.querySelector('.setup');
const gameSelector = document.querySelector('.gameList');
const totalHandsSelector = document.querySelector('.totalHands');
const totalCardsSelector = document.querySelector('.totalCards');


let game;
let openHand = false;
let closeHand; 
//Total players and cards for each 
let maxPlayers = 4;
let maxCards = 13;
// Game Deck
let mainDeck;
//fill the select tags with options 
//Games List
for (let game of gameList) {
    let gameOption = document.createElement('option')
    gameOption.value = game
    gameOption.textContent = game
    gameSelector.appendChild(gameOption)

}

for (let userCount = 0; userCount < maxPlayers; userCount++) {
    // console.log(userCount)
    let totalPlayers = document.createElement('option')
    totalPlayers.value = userCount + 1
    totalPlayers.textContent = userCount + 1
    totalHandsSelector.appendChild(totalPlayers)

}
for (let userCards = 0; userCards < maxCards; userCards++) {
    // console.log(userCards)
    let totalCards = document.createElement('option')
    totalCards.value = userCards + 1
    totalCards.textContent = userCards + 1
    totalCardsSelector.appendChild(totalCards)

}

//creates a card object with suit and value properties
class Card {
    constructor(suit, val) {
        this.suit = suit
        this.val = val
        this.img = `cards/${val + suit}.svg`
        this.mainValue = `${val + suit}`
    }

}
//Deck class that creates / randomizes / 
class Deck {
    constructor() {
        this.deck = [];
        this.hands = [];
        this.users = [];
        this.discardPile = [];
        this.activeDeck = false;
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

        for (let i = 0; i < hands; i++) {
            allHands.push([])

        }

        for (let cards = 0; cards < numCards; cards++) {
            for (let hand of allHands) {

                card = this.deck.shift()
                hand.push(card)
                // console.log(card,hand)
            }
        }
        return allHands
    }

    deckLen() {
        console.log(this.deck.length)
    }

    showWholeDeck() {
        console.log(this.deck)
    }

    drawNumCard(player, num) {
        let i = 0;
        let playerHand;
        let playerData;
        //get current user selected and add cards to there hand
        for (let j in this.users) {
            if (this.users[j] === player.name) {
                let user = `.${player.name}`
                playerData = document.querySelector(user)
                playerHand = this.hands[j]
            }
        }
        while (i < num) {
            console.log(playerData,player)
            let addCard = this.deck.shift()

            let cardVal = document.createElement('img');

            cardVal.setAttribute('src', addCard.img)


            cardVal.style.height = '60%';
            cardVal.style.width = '20%';
            playerData.appendChild(cardVal)
            playerHand.push(addCard.mainValue)

            i++
        }


    }

    removeCard(player,num){
        let i = 0;
        let playerHand;
        let playerData;
        //get current user selected and add cards to there hand
        for (let j in this.users) {
            if (this.users[j] === player.name) {
                let user = `.${player.name}`
                playerData = document.querySelector(user)
                playerHand = this.hands[j]
            }
        }
        while (i < num) {
            
            this.discardPile.push(playerData.lastChild);
            playerData.removeChild(playerData.lastChild);
            playerHand.pop()
            console.log(`Hey player han: ${playerHand}`,this.discardPile,playerData)
            
            // playerData.removeChild(cardVal)
            // console.log(playerHand.splice(playerHand.indexOf(addCard.mainValue),1))
            // console.log(playerHand)

            i++
        }
        

    }


}

//////////Game logic/////////////////////////////
class Game {
    constructor(name, deck) {
        this.name = name;
        this.deck = deck;
        this.continueTurn = true;
        this.players = []
        this.turn = 1;
        this.dealer = 0;
        this.maxTurn = 25;
        this.playerBtn;
        this.currentUser;
    }

    gameLogic() {


        for (let users in this.deck.users) {
            let player = {}
            player['name'] = this.deck.users[users];
            player['hand'] = this.deck.hands[users];
            player['turn'] = false;
            // console.log(deck.users[users],deck.hands[users])

            this.players.push(player)

        }

        //set player 1 to first to go
        this.players[this.dealer].turn = true;

        let playersBtns = document.querySelectorAll('.handBtn')
        for (let btn of playersBtns) {
            if (btn.value === this.players[this.dealer].name){
                this.playerBtn = btn
                this.playerBtn.style.display = 'block'
                // console.log(this.playerBtn)
            }
                
        }
        // console.log(this.players[this.dealer].name)
        // if(this.turn = 1){
        //     console.log(`${this.players[this.dealer].name} turn! ${this.turn}/${this.maxTurn} ${this.players.length}${this.dealer}`)
        //     alert(`${this.players[this.dealer].name} turn! ${this.turn}/${this.maxTurn} ${this.players.length}${this.dealer}`)
        // }
        // check maxturns vs turn -allow user to do something and have boolean end turn condition
        if (this.turn < this.maxTurn + 1) {
            console.log(`${this.players[this.dealer].name} turn! ${this.turn}/${this.maxTurn} ${this.players.length}${this.dealer}`)
            alert(`${this.players[this.dealer].name} turn! ${this.turn}/${this.maxTurn} ${this.players.length}${this.dealer}`)
            this.currentUser = this.players[this.dealer];
            this.playerTurn()


        }


    }
    endTurn() {
        // this.continueTurn = false;
        this.playerBtn.style.display = 'none';
        console.log(this.turn, this.maxTurn)
        if (this.turn === this.maxTurn + 1) {
            console.log('Game Over');
            deckBtn.textContent = 'Start'
            gameTable.innerHTML = ''
            gameMenu.innerHTML = ''
            mainDeck.activeDeck = false;
            if (prompt('Wanna play again') === 'y') {

                let newDeck = new Deck()
                new Game('Game1', newDeck).gameLogic()

            } else {
                alert('Game Over')

            }
        }
        if (this.dealer === this.players.length - 1) {
            this.dealer = 0
        } else {
            this.dealer++;
        }
        this.turn++;
        this.gameLogic()
    }
    playerTurn() {

        if (this.turn === this.maxTurn) {
            alert('LAST TURN')
            this.turn++;
            // break;
        }


    }



}




//////////Display logic/////////////////////////////
//Display the get deck sign or reset sign 
deckBtn.addEventListener('click', (event) => {


    //check if deal btn is showing if not show it and set the deck button to RESET
    if (dealBtn.style.display === '') {
        dealBtn.style.display = 'block';
        deckBtn.textContent = 'RESET'
        //set game setup to display none
        gameSettings.style.display = 'none';



    }
    // when we first click the deal button it will set the deal btn display to none 
    //here is to reset everything back to start
    else {
        dealBtn.style.display = '';
        deckBtn.textContent = 'Start'
        gameTable.innerHTML = ''
        gameMenu.innerHTML = ''
        mainDeck.activeDeck = false;
        //set back to default
        gameSettings.style.display = 'block';


    }




})

//creates the deck and the and puts it on the playing field 
dealBtn.addEventListener('click', (event) => {
    // console.log(totalCardsSelector.value, totalHandsSelector.value)
    mainDeck = new Deck();
    mainDeck.createDeck()

    mainDeck.randomizeDeck()
    alert('Deck created! Click the deck to deal the cards. ')
    dealBtn.style.display = 'none';
    //make the deck a clickable button with image inside
    const deckButton = document.createElement('button');
    deckButton.classList.add('deckButton');
    deckButton.style.position = 'absolute';

    deckButton.style.top = '25%';
    deckButton.style.left = '5%';
    const deckImage = document.createElement('img');
    deckImage.classList.add('deckImage');
    deckImage.setAttribute('src', `cards/RED_BACK.svg`)
    deckImage.style.height = '25vh';
    deckImage.style.width = '10vw';

    deckButton.appendChild(deckImage)
    gameTable.appendChild(deckButton)




})

//game table created and all the clicks the follow on it
gameTable.addEventListener('click', (event) => {
    //click the deck deal out the players
    if (event.target.classList[0] === 'deckImage' || event.target.classList[0] === 'deckButton') {
        //if the first time create the gameTable and set activeDeck to true
        if (!mainDeck.activeDeck) {
            mainDeck.activeDeck = true;
            let hands = mainDeck.deal(totalHandsSelector.value, totalCardsSelector.value);
            let count = 0;
            //gameboard created 
            const gameBoard = document.createElement('div');
            // cardContainer.classList.add('hand', 'hhand-compact', 'active-hand')
            gameBoard.style.backgroundColor = 'green';
            gameBoard.style.width = '60vw';
            gameBoard.style.height = '80vh';
            gameBoard.style.left = '20%';
            gameBoard.style.bottom = '3%';
            gameBoard.style.position = 'relative';
            gameBoard.style.display = 'grid';   
            gameBoard.style.gridTemplateRows = 'auto auto';
            gameBoard.style.gridTemplateColumns = 'auto auto';
            gameBoard.style.justifyContent = 'center';
            gameBoard.style.padding = 'auto';
            gameBoard.classList.add('gameBoard');
            const endTurn = document.createElement('button');
            const startGame = document.createElement('button');
            const drawCard = document.createElement('button');
            const removeCard = document.createElement('button');


            endTurn.innerText = "END TURN";
            endTurn.style.position = 'absolute';
            endTurn.style.top = '15%';
            endTurn.style.left = '0%';
            endTurn.classList.add('endTurn');
            endTurn.style.display = 'none';


            startGame.innerText = "START GAME";
            startGame.style.position = 'absolute';
            startGame.style.top = '0%';
            startGame.style.left = '0%';
            startGame.classList.add('startGame');


            drawCard.innerText = "Draw Card";
            drawCard.style.position = 'absolute';
            drawCard.style.bottom = '0%';
            drawCard.style.right = '10%';
            drawCard.classList.add('drawCard');
            drawCard.style.display = 'none';

            removeCard.innerText = "Remove Card";
            removeCard.style.position = 'absolute';
            removeCard.style.bottom = '0%';
            removeCard.style.right = '20%';
            removeCard.classList.add('removeCard');
            removeCard.style.display = 'none';
            //added it to the gameMenu table
            gameMenu.appendChild(endTurn);
            gameMenu.appendChild(startGame);
            gameMenu.appendChild(drawCard);
            gameMenu.appendChild(removeCard);
            //get the list of users to add to the deck class and keep track of turns
            let userProfiles = [];
            //create each users hand container 
            for (let hand of hands) {
                let userHandList = [];

                let handContainer = document.createElement('div');
                let playerShowHands = document.createElement('button');
                playerShowHands.textContent = `Player${count + 1} Hand`;
                playerShowHands.style.position = 'absolute';
                playerShowHands.style.display = 'none';
                playerShowHands.style.bottom = '0%';
                playerShowHands.style.right = '0%';
                handContainer.innerHTML = `Player${count + 1} `;
                //added the user name to the class
                handContainer.classList.add('hand', 'hhand-compact', 'active-hand', `Player${count + 1}`);
                playerShowHands.value = `Player${count + 1}`;
                playerShowHands.classList.add('handBtn');
                // handContainer.style.backgroundColor = 'white';
                userProfiles.push(playerShowHands.value);

                handContainer.style.width = '25vw';
                handContainer.style.height = '20vh';

                handContainer.style.display = 'flex';
                handContainer.style.flexDirection = 'row';
                handContainer.style.alignContent = 'center';
                handContainer.style.justifyContent = 'space-between';
                handContainer.style.gridRow = `0/${count + 1}`;
                handContainer.style.gridColumn = `0/${count + 1}`;
                handContainer.style.visibility = 'hidden'

                let handList = ''
                //create the contaier for each card 
                for (let cards of hand) {
                    let cardVal = document.createElement('img');
                    // cardVal.style.position = 'absolute'
                    // console.log(cards.val+cards.suit)
                    // handList+=`${cards.mainValue},`
                    cardVal.setAttribute('src', cards.img)
                    userHandList.push(cards.mainValue)

                    cardVal.style.height = '60%';
                    cardVal.style.width = '20%';
                    handContainer.appendChild(cardVal)

                }
                //add each hand after created
                gameMenu.appendChild(playerShowHands)
                gameBoard.appendChild(handContainer)

                mainDeck.hands.push(userHandList)

                count++

            }
            //add the gameBoard to the gameTable
            gameTable.appendChild(gameBoard)
            mainDeck.users = userProfiles;

        }
        //if we are currently still playing with current deck 
        else if (mainDeck.activeDeck) {
            alert('click start game to start the game')
        }

    }



})
//the gameMenu that will allow the user to do actions 
gameMenu.addEventListener('click', (event) => {

    //player Buttons 








    let targetClass = `.${event.target.className}`
    
    // console.log(targetClass)

    //check if hand button  is clicked 
    if (targetClass === '.handBtn') {
        // console.log(openHand)
        let targetValue = `.${event.target.value}`
        
        if(!openHand || openHand){
            if (document.querySelector(targetValue).style.visibility === '' || document.querySelector(targetValue).style.visibility === 'hidden') {

                document.querySelector(targetValue).style.visibility = 'visible'
            } else if (document.querySelector(targetValue).style.visibility === 'visible') {
                document.querySelector(targetValue).style.visibility = 'hidden'
            }

            
        }
        closeHand = targetValue;
        openHand = true;
        // console.log(openHand)
        
    }
    
    //check if end turn is clicked 
    if (targetClass === '.endTurn') {
        // console.log(openHand)
        if(openHand){
            document.querySelector(closeHand).style.visibility = 'hidden';
            game.endTurn()
        }
        else{
            // console.log(targetClass)
            game.endTurn()
        }
        
    }

    //check if start game clicked then start the game
    if (targetClass === '.startGame') {
        // console.log(document.querySelector('.gameBoard'))
        document.querySelector('.endTurn').style.display = 'block';
        document.querySelector('.drawCard').style.display = 'block';
        document.querySelector('.removeCard').style.display = 'block';
        game = new Game(gameSelector.value, mainDeck);
        game.gameLogic();
    }

    //draw card 
    if(targetClass === '.drawCard'){
        
        // console.log(game.currentUser.hand,game.deck)
        game.deck.drawNumCard(game.currentUser,1)
    }
    if(targetClass === '.removeCard'){
        
        // console.log(game.currentUser.hand,game.deck)
        
        game.deck.removeCard(game.currentUser,1)
    }
    
})






//

