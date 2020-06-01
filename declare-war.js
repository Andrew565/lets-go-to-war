"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Player_1 = require("./Player");
const helpers_1 = require("./helpers");
const Rules_1 = require("./Rules");
class Game {
    constructor(rule, numPlayers) {
        this.players = [];
        this.gameOver = false;
        this.round = 1;
        this.winningId = undefined;
        this.checkForWinner = () => {
            if (this.activePlayers.length === 1) {
                this.winningId = this.activePlayers[0].id;
                return true;
            }
            return false;
        };
        this.deck = helpers_1.make52();
        for (var num = 0; num < numPlayers; num++) {
            const cards = this.deck.splice(0, Math.ceil(52 / numPlayers));
            this.players.push(new Player_1.Player(cards));
        }
        this.rule = rule.bind(this);
    }
    get activePlayers() {
        return this.players.filter((player) => player.totalCards > 0);
    }
    goToWar() {
        console.log("goToWar called");
        let turnCount = 1;
        while (!this.gameOver) {
            console.log("Turn #", ++turnCount);
            this.rule();
            this.gameOver = this.checkForWinner();
        }
        if (this.winningId)
            console.log("The winner is:", this.players[this.winningId]);
    }
}
exports.Game = Game;
console.log("Starting Basic War");
const game = new Game(Rules_1.BasicWarRule, 2);
game.goToWar();
