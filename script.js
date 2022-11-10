'use strict';

window.addEventListener('keypress', inputManagement);
window.addEventListener('click', clickManagement);
// window.addEventListener('load', onLoad);
let gameboardArray = [];
const gameboardContainer = document.querySelector('.gameboard');
const playersContainer = document.querySelector('.container.players');
const startGameButton = document.querySelector('button.start-game');
// const startGameButtonContainer = document.querySelector('div.button-start-container');
const gameContainerWidth = document.querySelector('.game').getBoundingClientRect().width;
const gameContainerHeight = document.querySelector('.game').getBoundingClientRect().height;
// startGameButton.addEventListener('click', newGame);


let player1, player2;

const newGameboard = new Gameboard();

function Gameboard() {
    for (let i = 0; i < 9; i++) {
        let block = document.createElement('div');
        block.classList.add('block');
        block.setAttribute('data-index', `${i}`);
        gameboardContainer.appendChild(block);
        // block.addEventListener('click', X_O);
        gameboardArray.push(block);
        gameboardArray.push({index : i});
    }
}

let count = 0;
function Gameflow (playerOneName, playerTwoName, symbolOne, symbolTwo) {

    for (let board of gameboardArray) {
        board.addEventListener('click', () => {
            if (board.classList.contains('tagged')) {
                return;
            } else {
                count++;
                const boardIndex = board.getAttribute('data-index');
                if (count % 2 === 0) {
                    board.classList.add('tagged');
                    board.textContent = symbolOne;
                    gameboardArray[board].push({symbol : `${symbolOne}`});
                } else if (count % 2 !== 0) {
                    board.classList.add('tagged');
                    board.textContent = symbolTwo;
                    gameboardArray[board].push({symbol : `${symbolTwo}`});
                }
                // checkCombinations();
            }
        });
    }

    function checkCombinations() {
        // console.log(gameboardArray);
    }
}

let playerOneName, playerTwoName, playerOneSymbol, playerTwoSymbol;

function clickManagement(event) {

    //SECOND PLAYER THIRD AND LAST SCREEN
    if (event.target === document.querySelector('.player-two-register')) {
        let goBack = false;

        if (document.querySelector('input.player-name.two').value === '') {
            if (document.querySelector('.third.message-two.no-opacity')) {
                document.querySelector('.third.message-two.no-opacity').classList.remove('no-opacity');
                document.querySelector('.third.message-two').classList.add('message');
                goBack = true;
            } else {
                goBack = false;
                return;
            }
        }

        if (goBack === true) {
            return;
        }

        playerTwoName = (document.querySelector('input.player-name.two').value);
        Gameflow(playerOneName, playerTwoName, playerOneSymbol, playerTwoSymbol)
        // playerOneSymbol = document.querySelector('button.focus').textContent;
        // document.querySelector('.first').classList.add('hide')
        // document.querySelector('.second').classList.remove('hidden');
        // document.querySelector('.second').classList.add('screen');
    }

    //HUMAN CPU CHOICE MANAGEMENT
    if (event.target === document.querySelector('button.human-cpu-choice')) {
        let goBack = false;
        if (document.querySelector('button.cpu.focus') === null && document.querySelector('button.human.focus') === null) {
            document.querySelector('.second.message-two.no-opacity').classList.remove('no-opacity');
            document.querySelector('.second.message-two').classList.add('message');
            goBack = true;
        } else {
            goBack = false;
        }

        if (goBack === true) {
            return;
        }

        if (document.querySelector('button.cpu.focus')) {

        } else if (document.querySelector('button.human.focus')) {
            document.querySelector('.second').classList.add('hide');
            document.querySelector('.third').classList.remove('hidden');
            document.querySelector('.third').classList.add('screen');
            document.querySelector('.show-symbol').textContent += ` ${playerTwoSymbol}`;
        }
    }

    //SECOND SCREEN HUMAN CPU CHOICE FOCUS
    if (event.target === document.querySelector('.human')) {
        event.target.classList.add('focus');
        if (document.querySelector('.cpu').classList.contains('focus')) {
            document.querySelector('.cpu').classList.remove('focus');
        }
    } else if (event.target === document.querySelector('.cpu')) {
        event.target.classList.add('focus');
        if (document.querySelector('.human').classList.contains('focus')) {
            document.querySelector('.human').classList.remove('focus');
        }
    }
    
    //FIRST SCREEN VALIDATION
    if (event.target === document.querySelector('.player-one-register')) {
        let goBack = false;

        if (document.querySelector('button.focus') === null) {
            if (document.querySelector('p.first.message-four.no-opacity')) {
                document.querySelector('p.first.message-four.no-opacity').classList.remove('no-opacity');
                document.querySelector('p.first.message-four').classList.add('message');
                goBack = true;
            } else {
                goBack = false;
                return;
            }
        }

        if (document.querySelector('input.player-name').value === '') {
            if (document.querySelector('.first.message-two.no-opacity')) {
                document.querySelector('.first.message-two.no-opacity').classList.remove('no-opacity');
                document.querySelector('.first.message-two').classList.add('message');
                goBack = true;
            } else {
                goBack = false;
                return;
            }
        }

        if (goBack === true) {
            return;
        }

        playerOneName = (document.querySelector('input.player-name.one').value);
        playerOneSymbol = document.querySelector('button.focus').textContent;
        playerTwoSymbol = document.querySelector('.symbol-choice div button:not(.focus)').textContent;
        document.querySelector('.first').classList.add('hide')
        document.querySelector('.second').classList.remove('hidden');
        document.querySelector('.second').classList.add('screen');
    }

    //FIRST SCREEN PLAYER ONE SYMBOL FOCUS
    if (event.target === document.querySelector('button.x')) {
        event.target.classList.add('focus');
        if (document.querySelector('button.o').classList.contains('focus')) {
            document.querySelector('button.o').classList.remove('focus');
        }
        checkHiddenMessage('button-message');
    } else if (event.target === document.querySelector('button.o')) {
        event.target.classList.add('focus');
        if (document.querySelector('button.x').classList.contains('focus')) {
            document.querySelector('button.x').classList.remove('focus');
        }
        checkHiddenMessage('button-message');   
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

function inputManagement(inputKey) {
    if (inputKey.key === 'Enter') {
        inputKey.preventDefault();
        return;
    }

    if (document.querySelector('input.player-name').value !== '') {
        checkHiddenMessage('player-one-name');
    }
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
function checkHiddenMessage(checkIt) {
    if (document.querySelector('p.first.message-four.message') && checkIt === 'button-message') {
        document.querySelector('p.first.message-four.message').classList.remove('message');
        document.querySelector('p.first.message-four').classList.add('no-opacity');
    }

    if (document.querySelector('.first.message-two.message') && checkIt === 'player-one-name') {
        document.querySelector('.first.message-two.message').classList.remove('message');
        document.querySelector('.first.message-two').classList.add('no-opacity');
    }
}