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

function Gameboard() {
    for (let i = 0; i < 9; i++) {
        gameboardArray.push({index : i})
        let block = document.createElement('div');
        block.classList.add('block');
        block.setAttribute('data-index', `${i}`);
        document.querySelector('.gameboard').appendChild(block);
    }
}

function Gameflow () {

    for (let block of gameboardArray) {
        block = document.querySelector(`.block[data-index = "${block.index}"]`);
        block.addEventListener('click', listener);
        block.addEventListener('click', checkMoves);
    }

    function checkMoves() {
        if (getMoves(playerOne) !== undefined) {
            document.querySelector('.fourth .winner').classList.remove('no-opacity');
            document.querySelector('.fourth .winner').textContent += ` ${playerOneName}`;
            for (let block of gameboardArray) {
                block = document.querySelector(`.block[data-index = "${block.index}"]`);
                block.removeEventListener('click', listener);
                block.removeEventListener('click', checkMoves);
            }
        } else if (getMoves(playerTwo) !== undefined) {
            document.querySelector('.fourth .winner').classList.remove('no-opacity');
            document.querySelector('.fourth .winner').textContent += ` ${playerTwoName}`;
            for (let block of gameboardArray) {
                block = document.querySelector(`.block[data-index = "${block.index}"]`);
                block.removeEventListener('click', listener);
            }
        }
    }
}

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
        playerTwo = Player(playerTwoName, playerTwoSymbol);
        document.querySelector('div.third').classList.add('hide');
        document.querySelector('div.fourth').classList.remove('hidden');
        document.querySelector('div.fourth').classList.add('screen');
        Gameflow();
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
        playerOne = Player(playerOneName, playerOneSymbol);
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

//TOGGLE START BUTTON
function newGame() {
    document.querySelector('button.start-game').classList.add('hide');
    document.querySelector('.button-start-container').classList.add('hide');
    document.querySelector('.game .button-start-container').classList.remove('button-start-container');
    document.querySelector('.first').classList.add('screen');
    document.querySelector('.first').classList.remove('hidden');
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

//MANAGE HIDDEN MESSAGES
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

//CREATE PLAYER OBJECTS
function Player(playerName, playerSymbol) {
    const name = playerName;
    const symbol = playerSymbol;
    return {name, symbol};
}

function getMoves(player) {
    const playerMoves = gameboardArray.filter(playedBlock => playedBlock.symbol === player.symbol);
    let probableWin = [];

    for (let i = 0; i < playerMoves.length; i++) {
        for (let combination of globalCheck) { //cycle through all possible combinations
            for (let index of combination) { //cycle through every number every combination
                if (playerMoves[i].index === index) { //if the played index matchs a number
                    //console.log(combination) //return the combinations with a matching number (ie played block)
                    probableWin.push({combination, combinationIndex : globalCheck.indexOf(combination)});
                    //compare the indexes of all combinations, keep the ones that have the same index?
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
