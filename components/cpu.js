'use strict'
export default async function makeAI(cpu) {
    // Used the tutorial from geeksforgeeks. Pretty straight forward.
    if (cpu.turn === true && cpu.type === 'cpu') {
        const bestMove = findBestMove(cpu)
        const x = bestMove.x
        const y = bestMove.y
        document.querySelector(`.tile[data-key ="${x},${y}"]`).click()
    }
}

function findBestMove(cpu) {
    let bestMove = { 
        x: null, y: null, move: -10000 
    }
    // I tried to make it differently but couldn't figure out why the algorithm wasn't performing optimally. Resorted to copy/paste pretty much the code from the site mentioned, to at least get the satisfying behavior
    let board = getBoard(cpu)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '_') {
                board[i][j] = `${cpu.symbol}`
                let moveVal = miniMax(board, 0, false, cpu.symbol)
                board[i][j] = '_'
                if (moveVal > bestMove.move) {
                    bestMove.x = i
                    bestMove.y = j
                    bestMove.move = moveVal
                }
            }
        }
    }
    return bestMove
}
function miniMax(board, depth, isMax, symbol) {
    let score = checkCombinations(board, symbol)
    if (score === 10) return score - depth
    if (score === -10) return score + depth
    if (isMoveLeft(board) === false) return 0
    if (isMax) {
        let best = - Infinity
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '_') {
                    board[i][j] = `${symbol}`
                    best = Math.max(best, miniMax(board, depth + 1, !isMax, symbol))
                    board[i][j] = '_'
                }
            }
        }
        return best
    } else {
        let best = Infinity
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '_') {
                    const opponentSymbol = symbol === 'cross' ? 'circle' : 'cross'
                    board[i][j] = `${opponentSymbol}`
                    best = Math.min(best, miniMax(board, depth + 1, !isMax, symbol))
                    board[i][j] = '_'
                }
            }
        }
        return best
    }
}
function checkCombinations(board, symbol) {
    const opponentSymbol = symbol === 'cross' ? 'circle' : 'cross'

    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1]
            && board[i][1] === board[i][2]) {
            if (board[i][0] === `${symbol}`) return 10
            else if (board[i][0] === `${opponentSymbol}`) return -10
        }
    }
    for (let j = 0; j < 3 ; j++) {
        if (board[0][j] === board[1][j]
            && board[1][j] === board[2][j]) {
            if (board[0][j] === `${symbol}`) return 10
            else if (board[0][j] === `${opponentSymbol}`) return -10
        }
    }
    if (board[0][0] === board[1][1]
        && board[1][1] === board[2][2]) {
        if (board[0][0] === `${symbol}`) return 10
        else if (board[0][0] === `${opponentSymbol}`) return -10
    }
    if (board[0][2] == board[1][1] &&
        board[1][1] == board[2][0]) {
        if (board[0][2] === `${symbol}`) return +10;
        else if (board[0][2] === `${opponentSymbol}`) return -10;
    }
    return 0
}
function getBoard(cpu) {
    let board = []
    let arr = []
    const opponentSymbol = cpu.symbol === 'cross' ? 'circle' : 'cross'
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const tile = document.querySelector(`.tile[data-key="${i},${j}"]`)
            let move = '_'
            if (tile.classList.contains(`${cpu.symbol}`)) {
                move = `${cpu.symbol}`
            } else if (tile.classList.contains(`${opponentSymbol}`)) {
                move = `${opponentSymbol}`
            }
            arr.push(move)
        }
        board.push(arr)
        arr = []
    }
    return board
}
const isMoveLeft = board => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '_') return true;
        }
    }
    return false;
}