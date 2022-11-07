'use strict';

const gameboardContainer = document.querySelector('.gameboard');
const playersContainer = document.querySelector('.container.players');

let gameboardArray = [];

const newGameboard = new Gameboard();
const player1 = new MakePlayer('Talal');
const CPU = new MakePlayer('CPU')

function Gameboard() {
    for (let i = 0; i < 9; i++) {
        let block = document.createElement('div');
        block.classList.add('block');
        block.setAttribute('data-index', `${i}`);
        gameboardContainer.appendChild(block);
        block.addEventListener('click', X_O);
        gameboardArray.push(block);
    }
}

function MakePlayer(name) {
    this.name = name;
    let playerBlock = document.createElement('div');
    playersContainer.appendChild(playerBlock);
    if (name === 'CPU') {
        playerBlock.classList.add('cpu');
    } else {
        playerBlock.classList.add('player');    
    }
    playerBlock.textContent = name;
}

function X_O(block) {
    block.target.textContent = 'X';
}