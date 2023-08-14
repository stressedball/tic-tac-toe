'use strict'
import GameBoard from "./GameBoard.js"
import Player from "./Player.js"
import makeAI from "./cpu.js"

export default async function gameLoop(player, symbol) {
    const board = new GameBoard()
    const playerOne = new Player('human', 'One', symbol)
    const symbolTwo = symbol === 'cross' ? 'circle' : 'cross'
    const playerTwo = player === "human" ? new Player('human', 'Two', symbolTwo) : new Player('cpu', 'AI', symbolTwo)
    while (board.gameOver() === false) {
        const currentPlayer = playerOne.turn === true ? playerOne : playerTwo
        const nextPlayer = playerOne.turn === true ? playerTwo : playerOne
        const turn = await tempFunc(currentPlayer)
        if (turn === 1) {
            currentPlayer.inverseTurn()
            nextPlayer.inverseTurn()
        }
    }
    return new Promise((res) => {
        let result 
        if (board.gameOver() === 'tie') {
            result = 'tie'
        }
        else {
            result = board.gameOver() === playerOne.symbol ? playerOne : playerTwo
        }
        res(result)
    })
}
const tempFunc = (curr) => {
    return new Promise((res) => {
        const getClick = (e) => {
            document.querySelector('.board').removeEventListener('click', getClick)
            if (!e.target.classList.contains('played')) {
                e.target.classList.add(curr.symbol)
                e.target.classList.add('played')
                res(1)
            } else {
                res(0)
            }
        }
        document.querySelector('.board').addEventListener('click', getClick)
        makeAI(curr)
    })
}


