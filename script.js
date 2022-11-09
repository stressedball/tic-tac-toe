'use strict';

window.addEventListener('keypress', inputManagement);
window.addEventListener('click', clickManagement);
// window.addEventListener('load', onLoad);
const gameboardContainer = document.querySelector('.gameboard');
const playersContainer = document.querySelector('.container.players');
const startGameButton = document.querySelector('button.start-game');
// const startGameButtonContainer = document.querySelector('div.button-start-container');
const gameContainerWidth = document.querySelector('.game').getBoundingClientRect().width;
const gameContainerHeight = document.querySelector('.game').getBoundingClientRect().height;
// startGameButton.addEventListener('click', newGame);


let gameboardArray = [];
let player1, player2;

const newGameboard = new Gameboard();
// const player1 = new MakePlayer('Talal');
// const CPU = new MakePlayer('CPU')

function Gameboard() {
    for (let i = 0; i < 9; i++) {
        let block = document.createElement('div');
        block.classList.add('block');
        block.setAttribute('data-index', `${i}`);
        gameboardContainer.appendChild(block);
        // block.addEventListener('click', X_O);
        gameboardArray.push(block);
    }
}

function MakePlayer(name) {
    // const player = () => name;
    this.name = name;
    // let playerBlock = document.createElement('div');
    // playersContainer.appendChild(playerBlock);
    // if (name === 'CPU') {
    //     playerBlock.classList.add('cpu');
    // } else {
    //     playerBlock.classList.add('player');    
    // }
}

// based on choice of X O
// make eventListener
function Symbol(player, symbol) {

}

function Gameflow (player1, player2, weapon1, weapon2) {

}

let goBack = false;
let goBackSymbol = false;
function clickManagement(event) {
    let playerOneName, playerTwoName, playerOneSymbol, playerTwoSymbol;
    
    if (event.target === document.querySelector('.player-one-register')) {
        // if (goBack === true) {
        //     return;
        // }

        if (document.querySelector('button.focus') === null) {
            if (document.querySelector('.symbol-choice p.hidden')) {
                document.querySelector('.symbol-choice p.hidden').classList.add('message');
                document.querySelector('.symbol-choice p.hidden').classList.remove('hidden');
            } 

        }

        if (document.querySelector('input.player-name').value === '') {
            if(document.querySelector('.second-message.hidden')) {
                document.querySelector('.second-message').classList.add('message');
                document.querySelector('.second-message').classList.remove('hidden');
            }

            // document.querySelector('button.focus');
        }

        if (goBack === true) {
            return;
        }
        // console.log(playerOneSymbol)
        playerOneName = (document.querySelector('input.player-name').value);
        playerOneSymbol = document.querySelector('button.focus');

    }

    if (event.target === document.querySelector('button.x')) {
        event.target.classList.add('focus');
        if (document.querySelector('button.o').classList.contains('focus')) {
            document.querySelector('button.o').classList.remove('focus');
        }
    } else if (event.target === document.querySelector('button.o')) {
        event.target.classList.add('focus');
        if (document.querySelector('button.x').classList.contains('focus')) {
            document.querySelector('button.x').classList.remove('focus');
        }
    }

    //event prevent default player 1 input name
    if (event.target.classList.contains('player-name')) {
        event.preventDefault();
        // let playerName = document.getElementById('player-name one').value;
    }

    //START GAME
    if (event.target.classList.contains('start-game')) {
        newGame();
    }
}

function inputManagement(inputKey) {
    if (inputKey.key === 'Enter') {
        inputKey.preventDefault();
        return;
    }
}

function newGame() {
    document.querySelector('button.start-game').classList.add('hide');
    document.querySelector('.button-start-container').classList.add('hide');
    document.querySelector('.game .button-start-container').classList.remove('button-start-container');
    document.querySelector('.first').classList.add('screen');
    document.querySelector('.first').classList.remove('hidden');
    // document.querySelector('div.hidden').classList.remove('hidden');
    // document.querySelector('.game > div').classList.add('game-start');
    // document.querySelector('.game').classList.add('game-start');
    // startGameButtonContainer.style.height =`${0.2 * gameContainerHeight}px`;
    // startGameButtonContainer.style.width = `${0.2 * gameContainerWidth}px`;
    // startGameButton.style.width = `${0.8 * startGameButtonContainer.getBoundingClientRect().width}px`;
    // startGameButton.style.height = `${0.8 * startGameButtonContainer.getBoundingClientRect().height}px`;

    // startGameButtonContainer.classList.add('game-start');
    // startGameButton.classList.remove('start-game');
    // startGameButton.classList.add('game-start');
    // startGameButton.textContent = 'Let\'s do this';
}

// function onLoad() {
//     startGameButtonContainer.style.height = `${gameContainerHeight}px`;
//     startGameButtonContainer.style.width = `${gameContainerWidth}px`;
//     const startGameButtonContainerWidth = startGameButtonContainer.getBoundingClientRect().width;
//     const startGameButtonContainerHeight = startGameButtonContainer.getBoundingClientRect().height;
//     startGameButton.style.width = `${0.5 * startGameButtonContainerWidth}px`;
//     startGameButton.style.height = `${0.5 * startGameButtonContainerHeight}px`;
//     startGameButton.style.transform = `translate(${(startGameButtonContainerWidth - (0.5 * startGameButtonContainerWidth)) / 2}px, ${(startGameButtonContainerHeight - (0.5 * startGameButtonContainerHeight)) / 2}px)`;
// }

function styleButtonStart() {

}