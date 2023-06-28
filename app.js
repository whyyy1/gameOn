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
let finalCardSelected = false;
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
        // console.log(this.deck.length)
        return this.deck.length
    }

    showWholeDeck() {
        console.log(this.deck)
    }

    drawNumCard(player, num) {
        let i = 0;


        while (i < num) {
            let topCard = this.deck.shift()
            let cardVal = document.createElement('img');

            cardVal.setAttribute('src', topCard.img)

            cardVal.classList.add('card')
            cardVal.style.height = '60%';
            cardVal.style.width = '20%';
            // console.log(topCard, player.children)
            player.appendChild(cardVal)
            i++
        }


    }

    removeCard(player, num) {
        let i = 0;
        let playerHand;
        let playerData;
        console.log(player)
        // //get current user selected and add cards to there hand
        // for (let j in this.users) {
        //     if (this.users[j] === player.name) {
        //         let user = `.${player.name}`
        //         playerData = document.querySelector(user)
        //         playerHand = this.hands[j]
        //     }
        // }
        // while (i < num) {

        //     this.discardPile.push(playerData.lastChild);
        //     playerData.removeChild(playerData.lastChild);
        //     playerHand.pop()
        //     console.log(`Hey player han: ${playerHand}`, this.discardPile, playerData)

        //     // playerData.removeChild(cardVal)
        //     // console.log(playerHand.splice(playerHand.indexOf(addCard.mainValue),1))
        //     // console.log(playerHand)

        //     i++
        // }


    }

    playCard(card) {
        console.log(card)
    }


}

//////////Game logic/////////////////////////////
class Game {
    constructor(name, deck) {
        this.name = name;
        this.deck = deck;
        this.playField = []
        this.players = []
        this.turn = 0;
        this.dealer = 0;
        this.maxTurn = 25;
        this.playerBtn;
        this.currentUser;
        this.roundStart = 0;

    }

    gameSetup() {
        // set the player hands and return the players
        for (let users in this.deck.users) {
            let player = {}
            //get each user and there 
            // console.log(this.deck)

            player['name'] = this.deck.users[users];
            player['hand'] = this.deck.hands[users];
            player['turn'] = false;
            this.players.push(player)
        }

        this.gameLogic()
    }

    gameLogic() {



        //set player 1 to first to go



        let playersBtns = document.querySelectorAll('.handBtn')

        for (let btn of playersBtns) {
            if (btn.value === this.players[this.dealer].name) {
                this.playerBtn = btn
                this.playerBtn.style.display = 'block'
                // console.log(this.playerBtn)
            }

        }

        // check maxturns vs turn -allow user to do something and have boolean end turn condition
        if (this.turn + 1 < this.maxTurn) {
            document.querySelector('.gameInfo').innerText = `${this.players[this.dealer].name} turn - Turn ${this.turn + 1}/${this.maxTurn}`
            console.log(`${this.players[this.dealer].name} turn! ${this.turn + 1}/${this.maxTurn} ${this.players.length}${this.dealer}`)
            // setInterval(alert(`${this.players[this.dealer].name} turn! ${this.turn + 1}/${this.maxTurn}`), 3000)
            this.currentUser = this.players[this.dealer];
            this.playerTurn()
        }



    }
    endTurn() {
        //turn of hand vidibilty 
        let handVis = `.${this.players[this.dealer].name}`
        document.querySelector(handVis).style.visibility = 'hidden'
        this.players[this.dealer].turn = false;
        //whose turn ended 
        //check if any players are left and continue or end game

        finalCardSelected = false
        this.playerBtn.style.display = 'none';
        // //check max turn hit
        if (this.turn === this.maxTurn+1) {
            this.endGame()
        }
        else if (this.turn > 0) {

            if ((this.turn + 1) % this.players.length === 0) {
                for (let cP of document.querySelector('.playArea').children) {

                    for (let user of this.players) {
                        if (cP.name === user.name) {

                            if (user.hand.includes(cP.id)) {
                                let indexOfCard = user.hand.indexOf(cP.id)
                                let removedSym = user.hand.splice(indexOfCard, 1)
                                // console.log('get it out of here')
                            }

                        }
                    }
                }
                // console.log(this.players)
                this.score()
                this.roundStart += 1;
                this.dealer = 0;

            }
            else {
                this.dealer++;

            }


        }
        else {
            this.dealer++;

        }





        this.turn++;
        this.gameLogic()
    }
    playerTurn() {

        if (this.turn === this.maxTurn) {
            alert('LAST TURN')

            // break;
        }


    }

    score() {


        let allCardsPlayed = document.querySelector('.playArea').children;
        let highestValue = 0;
        let highestCard;
        let winnerName = ''
        let cardPlayed = []


        //push card value to array list of cards played

        // //remove the card from the players hand
        console.log('hey')
        for (let cardsPlayArea of allCardsPlayed) {

            this.playField.push(cardsPlayArea.id)
            if (cardsPlayArea.value > highestValue) {
                highestValue = cardsPlayArea.value
                highestCard = cardsPlayArea
                winnerName = cardsPlayArea.name


            }
            cardPlayed.push(cardsPlayArea)

        }
        switch (highestValue) {
            case 14:
                highestValue = "Ace";
                break;
            case 13:
                highestValue = "King";
                break;
            case 12:
                highestValue = "Queen";
                break;
            case 11:
                highestValue = "Jack";
                break;
            default:
                alert(`${winnerName} won with a ${highestValue}`)

        }

        for (let userH of this.players) {


            if (userH.name === winnerName) {
                let wH = `.${winnerName}`
                let winningClass = document.querySelector(wH)
                console.log('hey')
                console.log(this.playField, cardPlayed)
                for (let sym of this.playField) {
                    userH.hand.push(sym)

                }
                this.playField = []
                for (let cardImges of cardPlayed) {
                    // console.log(cardImges)
                    cardImges.setAttribute('src', 'cards/RED_BACK.svg')
                    winningClass.appendChild(cardImges)
                    cardPlayed = []
                }

            }






            if (userH.name !== winnerName) {
                //check if user has any cards left if not they are out and 
                if (userH.hand.length === 0) {
                    alert(`${userH.name} has no more cards`);
                    console.log(this.players, userH)
                    this.endGame()
                }

            }






        }

        // console.log(this.playField)
        // let wH = `.${winnerName}`
        // let winnerHandDom = document.querySelector(wH)

        // for (let card of cardPlayed) {

        //     card.setAttribute('src', 'cards/RED_BACK.svg')
        //     winnerHandDom.appendChild(card)

        // }
        // // for (let sym of this.playField) {
        // //     console.log(sym[0])

        // // }




        // setInterval(document.querySelector('.playArea').innerHTML = '', 4000)
    }

    handTotal(hand) {
        console.log(this.players[this.dealer], this.dealer, this.turn)
    }

    endGame() {
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
            let totalPlayers = parseInt(prompt("How many players?"))
            console.log(totalPlayers)
            console.log(Math.floor(mainDeck.deckLen() / totalPlayers))
            let hands = mainDeck.deal(totalPlayers, Math.floor(mainDeck.deckLen() / totalPlayers));// 
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

            let playArea = document.createElement('div');
            playArea.style.backgroundColor = 'red';
            playArea.style.position = 'absolute';
            playArea.style.zIndex = '1';
            playArea.style.top = '25%';
            playArea.style.left = '25%';
            playArea.style.width = '35vw';
            playArea.style.height = '55vh';
            playArea.classList.add('playArea');


            const endTurn = document.createElement('button');
            const startGame = document.createElement('button');
            const drawCard = document.createElement('button');
            const removeCard = document.createElement('button');
            const battle = document.createElement('button');
            const gameInfo = document.createElement('h3');


            endTurn.innerText = "END TURN";
            endTurn.style.position = 'absolute';
            endTurn.style.top = '15%';
            endTurn.style.left = '0%';
            endTurn.classList.add('endTurn');
            endTurn.style.display = 'none';

            
            gameInfo.innerText = 'PLayer Turn';
            gameInfo.style.position = 'absolute';
            // gameInfo.style.top = '0%';
            // gameInfo.style.left = '40%';
            gameInfo.classList.add('gameInfo');


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


            battle.innerText = "Battle";
            battle.style.position = 'absolute';
            battle.style.bottom = '0%';
            battle.style.right = '30%';
            battle.classList.add('battle');
            battle.style.display = 'none';
            //added it to the gameMenu table
            gameMenu.appendChild(endTurn);
            
            gameMenu.appendChild(startGame);
            gameMenu.appendChild(drawCard);
            gameMenu.appendChild(removeCard);
            gameMenu.appendChild(battle)
            //get the list of users to add to the deck class and keep track of turns
            let userProfiles = [];
            //create each users hand container 
            for (let hand of hands) {
                let userHandList = [];

                let handContainer = document.createElement('div');
                let playerTag = document.createElement('p');

                let playerShowHands = document.createElement('button');
                playerShowHands.textContent = `Player${count + 1} Hand`;
                playerShowHands.style.position = 'absolute';
                playerShowHands.style.display = 'none';
                playerShowHands.style.bottom = '0%';
                playerShowHands.style.right = '0%';
                playerTag.innerHTML = `Player${count + 1}`;
                playerTag.style.position = 'relative';
                playerTag.zIndex = '3'
                playerTag.style.backgroundColor = 'white';
                playerTag.style.bottom = '-50%';
                // playerTag.style.gridRow = `${count}/${count + 1}`;
                // playerTag.style.gridColumn = `1/${count + 1}`;
                playerTag.style.zIndex = '3'
                //added the user name to the class
                handContainer.classList.add('hand', 'hhand-compact', 'active-hand', `Player${count + 1}`);
                playerShowHands.value = `Player${count + 1}`;
                playerShowHands.classList.add('handBtn');

                userProfiles.push(playerShowHands.value);

                handContainer.style.width = '25vw';
                handContainer.style.height = '20vh';

                handContainer.style.display = 'flex';
                handContainer.style.flexDirection = 'row';
                handContainer.style.alignContent = 'center';
                handContainer.style.justifyContent = 'space-between';
                handContainer.style.gridRow = `0/${count + 1}`;
                handContainer.style.zIndex = '2';
                handContainer.style.gridColumn = `0/${count + 1}`;
                handContainer.style.visibility = 'hidden'
                handContainer.appendChild(playerTag)
                let handList = ''
                //create the contaier for each card 
                for (let cards of hand) {

                    let cardVal = document.createElement('img');
                    if (parseInt(cards.val)) {
                        cardVal.value = parseInt(cards.val)
                    }
                    else {
                        if (cards.val === 'A') {
                            cardVal.value = 14
                        }
                        if (cards.val === 'K') {
                            cardVal.value = 13
                        }
                        if (cards.val === 'Q') {
                            cardVal.value = 12
                        }
                        if (cards.val === 'J') {
                            cardVal.value = 11
                        }
                    }
                    let v = cards.mainValue
                    // console.log(v)
                    cardVal.classList.add('card')
                    cardVal.setAttribute('id', cards.mainValue)

                    // cardVal.style.position = 'absolute'
                    // console.log(cards.val+cards.suit)
                    // handList+=`${cards.mainValue},`
                    cardVal.setAttribute('src', 'cards/RED_BACK.svg')
                    userHandList.push(cards.mainValue)

                    cardVal.style.height = '60%';
                    cardVal.style.width = '20%';
                    handContainer.appendChild(cardVal)

                }

                //add each hand after created
                gameMenu.appendChild(playerShowHands)
                gameBoard.appendChild(handContainer)
                gameBoard.appendChild(playArea)
                gameBoard.appendChild(gameInfo)
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

    if (event.target.className === 'card') {
        let cardPicked;
        if (game) {
            // console.log(event.target.parentNode.classList,game.currentUser.name)
            let parentNodeList = event.target.parentNode.classList
            let mainHand = event.target.parentNode;


            // console.log(parentNodeList)
            if (!finalCardSelected) {
                for (let node in parentNodeList) {
                    if (parentNodeList[node] === game.currentUser.name) {


                        if (true) {
                            finalCardSelected = true;
                            let cardImg = `cards/${event.target.id}.svg`

                            event.target.setAttribute('src', cardImg)
                            event.target.setAttribute('name', game.currentUser.name)
                            let cardSelected = event.target.parentNode.removeChild(event.target)
                            cardPicked = cardSelected
                            // console.log(document.querySelector('.playArea'))

                            document.querySelector('.playArea').appendChild(cardSelected)

                            game.endTurn();
                        }

                    }
                    // //return card
                    // else if (parentNodeList[node] === 'playArea') {
                    //     if (prompt('this card?' === 'yes')) {
                    //         let cardSelected = event.target.parentNode.removeChild(event.target)
                    //         let userHand = `.${game.currentUser.name}`
                    //         // console.log(document.querySelector(userHand))
                    //         document.querySelector(userHand).appendChild(cardSelected)
                    //     }
                    // }

                }
            }
            else {
                // console.log(mainHand.children)
                // console.log(cardPicked)
                alert('already picked a card')
            }
        }
        else {
            alert('click start game to start the game')
        }



        // else if(parentNodeList.includes(game.currentUser.name)){
        //     console.log('userhand')

        // }
        // console.log(document.querySelector('.playArea'),game.currentUser)



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

        if (!openHand || openHand) {
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
        if (openHand) {
            document.querySelector(closeHand).style.visibility = 'hidden';
            game.endTurn()
        }
        else {
            // console.log(targetClass)
            game.endTurn()
        }

    }

    //check if start game clicked then start the game
    if (targetClass === '.startGame') {
        // console.log(document.querySelector('.gameBoard'))
        document.querySelector('.endTurn').style.display = 'block';
        document.querySelector('.drawCard').style.display = 'block';
        // document.querySelector('.removeCard').style.display = 'block';
        document.querySelector('.battle').style.display = 'block';
        game = new Game(gameSelector.value, mainDeck,);
        game.gameSetup();

    }

    //draw card 
    if (targetClass === '.drawCard') {
        game.handTotal()
        // let userName = `.${game.currentUser.name}`
        // // console.log(game.currentUser.hand,game.deck)
        // game.deck.drawNumCard(document.querySelector(userName), prompt('how many to draw?'))
    }
    if (targetClass === '.removeCard') {
        let userName = `.${game.currentUser.name}`
        // console.log(game.currentUser.hand,game.deck)

        game.deck.removeCard(document.querySelector(userName), 1)


    }
    if (targetClass === '.battle') {
        let gameB = document.querySelector('.gameBoard')
        for (let hands of gameB.children) {

            if (hands.classList[0] === 'hand') {
                // console.log(hands)
                console.log(hands.children[1].value, hands.children[1].id)
                // for(let hand in hands.children){
                //     console.log(hands.children[1])
                // }

            }
        }

    }

})


