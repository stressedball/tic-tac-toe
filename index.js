'use strict';
import Header from './components/Header.js';
import symbolChoice from './components/symbolChoice.js';
import gameLoop from './components/gameLoop.js';
import opponentChoice from './components/opponent-choice.js';
import winner from './components/winner-display.js';

async function Index() {
    Header();
    const player = await opponentChoice();
    const symbol = await symbolChoice();
    const result = await gameLoop(player, symbol);
    winner(result);
}

Index();
