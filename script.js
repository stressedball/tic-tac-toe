'use strict';

window.addEventListener('keypress', inputManagement);
window.addEventListener('click', clickManagement);
let gameboardArray = [];
const newGameboard = new Gameboard();
let count = 0;
let playerOne = {};
let playerTwo = {};
let playerOneName = '', playerTwoName = '', playerOneSymbol = '', playerTwoSymbol = '';
let globalCheck = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [6, 4, 2]];
let isHuman = false;

//GENERATE GAMEBOARD AND STORE INDEX IN AN ARRAY
function Gameboard() {
    for (let i = 0; i < 9; i++) {
        gameboardArray.push({index : i})
        let block = document.createElement('div');
        block.classList.add('block');
        block.setAttribute('data-index', `${i}`);
        document.querySelector('.gameboard').appendChild(block);
    }
}

//VS HUMAN PLAYERS, EVENT LISTENERS NEEDED
function Game () {
    for (let block of gameboardArray) {
        block = document.querySelector(`.block[data-index = "${block.index}"]`);
        block.addEventListener('click', listener);
        block.addEventListener('click', checkMoves);
    }

}


function checkMoves() {
    if (getMoves(playerOne) !== undefined) {
        displayWinner(playerOneName);
        removeListeners();
    } else if (getMoves(playerTwo) !== undefined) {
        displayWinner(playerTwoName);
        removeListeners();
    }
}

//DETECT COMBINATIONS AND RETURN PLAYER NAME IF WINNING COMBINATION
function getMoves(player) {
    const playerMoves = gameboardArray.filter(playedBlock => playedBlock.symbol === player.symbol);
    let probableWin = [];

    for (let i = 0; i < playerMoves.length; i++) {
        for (let combination of globalCheck) { //cycle through all possible combinations
            for (let index of combination) { //cycle through every number every combination
                if (playerMoves[i].index === index) { //if the played index matchs a number
                    probableWin.push({combinationIndex : globalCheck.indexOf(combination)});
                }
            }
        }
    } 

    for (let i = 0; i < probableWin.length; i++) {
        if (probableWin.filter(element => element.combinationIndex === probableWin[i].combinationIndex).length === 3) {
            return player;
        }
    }

}

//CPU LISTENS TO CLICKS MADE BY USER TO ACT

//MAKE TURNS ON CLICKS, ADD X OR O, ADD SYMBOL TO GAMEBOARDARRAY
function listener(event) {
    let block = document.querySelector(`.block[data-index = "${event.target.dataset.index}"]`);
    if (block.classList.contains('tagged')) {
        return;
    } else {
        const boardIndex = block.getAttribute('data-index');
        let symbol;
        if (count % 2 === 0) {
            symbol = playerOne.symbol;
        } else if (count % 2 !== 0) {
            symbol = playerTwo.symbol;
        }
        block.classList.add('tagged');
        block.textContent = symbol;
        gameboardArray[boardIndex].symbol = symbol;
        count++;
    }
}

function removeListeners() {
    for (let block of gameboardArray) {
        block = document.querySelector(`.block[data-index = "${block.index}"]`);
        block.removeEventListener('click', listener);
        block.removeEventListener('click', checkMoves);
    }
}

function displayWinner(name) {
    document.querySelector('.fourth .winner').classList.remove('no-opacity');
    document.querySelector('.fourth .winner').classList.add('message');
    document.querySelector('.fourth .winner').textContent += ` ${name}`;
}

//THE WHOLE SCREENS LOGIC, TAKES PLAYERS NAME, CHOICE BETWEEN HUMAN VS CPU/HUMAN
function clickManagement(event) {

    //SECOND PLAYER SCREEN
    if (event.target === document.querySelector('.player-two-register')) {  
        let goBack = false;

        if (document.querySelector('input.player-name.two').value === '') {
            if (document.querySelector('.third.message-two.no-opacity')) {
                toggleOpacity('.third.message-two');
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
        playerTwo = Player(playerTwoName, playerTwoSymbol);
        toggleScreens('.third', '.fourth');
        Game();
        isHuman = true;
    }

    //HUMAN CPU CHOICE MANAGEMENT
    if (event.target === document.querySelector('button.human-cpu-choice')) {
        let goBack = false;
        if (document.querySelector('button.cpu.focus') === null && document.querySelector('button.human.focus') === null) {
            toggleOpacity('.second.message-two');
            goBack = true;
        } else {
            goBack = false;
        }

        if (goBack === true) {
            return;
        }

        if (document.querySelector('button.cpu.focus')) {
            playerTwo = Player('CPU', playerTwoSymbol);
            toggleScreens('.second', '.fourth')
            Game();
        } else if (document.querySelector('button.human.focus')) {
            toggleScreens('.second', '.third')
            document.querySelector('.show-symbol').textContent += ` ${playerTwoSymbol}`;
        }
    }

    ///////////////////SYLE ONLY -> SECOND SCREEN HUMAN CPU CHOICE FOCUS
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
                toggleOpacity('.first.message-four');
                goBack = true;
            } else {
                goBack = false;
                return;
            }
        }

        if (document.querySelector('input.player-name').value === '') {
            if (document.querySelector('.first.message-two.no-opacity')) {
                toggleOpacity('.first.message-two');
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
        playerOne = Player(playerOneName, playerOneSymbol);
        playerTwoSymbol = document.querySelector('.symbol-choice div button:not(.focus)').textContent;
        toggleScreens('.first', '.second')
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
    }

    //START GAME
    if (event.target.classList.contains('start-game')) {
        newGame();
    }
}

//prevent enter key and check hidden
function inputManagement(inputKey) {
    if (inputKey.key === 'Enter') {
        inputKey.preventDefault();
        return;
    }

    if (document.querySelector('input.player-name').value !== '') {
        checkHiddenMessage('player-one-name');
    }
}

//CREATE PLAYER OBJECTS
function Player(playerName, playerSymbol) {
    const name = playerName;
    const symbol = playerSymbol;
    return {name, symbol};
}



/////////////////////////////////////////////////////////////////////////////
//////////////////////////STYLES/////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

//STYLE -> TOGGLE SCREENS
function toggleScreens(screenOne, screenTwo) {
    document.querySelector(`${screenOne}`).classList.add('hide');
    document.querySelector(`${screenTwo}`).classList.remove('hidden');
    document.querySelector(`${screenTwo}`).classList.add('screen');
}

//STYLE -> MANAGE HIDDEN MESSAGES
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

//STYLE -> TOGGLE START BUTTON
function newGame() {
    document.querySelector('button.start-game').classList.add('hide');
    document.querySelector('.button-start-container').classList.add('hide');
    document.querySelector('.game .button-start-container').classList.remove('button-start-container');
    document.querySelector('.first').classList.add('screen');
    document.querySelector('.first').classList.remove('hidden');
}

//STYLE -> OPACITY 
function toggleOpacity(selector) {
    document.querySelector(`${selector}`).classList.remove('no-opacity');
    document.querySelector(`${selector}`).classList.add('message');
}