'use strict'
export default class Player{
    constructor(player, handle, symbol){
        this.type = player
        this.turn = symbol === 'cross' ? true : false;
        this.symbol = symbol
        this.handle = handle
    }
    inverseTurn(){
        this.turn = this.turn === true ? false : true
    }
}