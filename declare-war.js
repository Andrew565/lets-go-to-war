"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Player_1 = require("./Player");
const helpers_1 = require("./helpers");
const Rules_1 = require("./Rules");
const StatisticsObject_1 = require("./StatisticsObject");
const parseStatistics_1 = require("./parseStatistics");
class Game {
    constructor(rule, numPlayers, stats) {
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
            this.players.push(new Player_1.Player(num, cards));
        }
        this.rule = rule.bind(this);
        this.stats = stats;
    }
    get activePlayers() {
        return this.players.filter((player) => player.totalCards > 0);
    }
    goToWar() {
        while (!this.gameOver) {
            this.stats.incrementTurns();
            this.rule();
            this.gameOver = this.checkForWinner();
        }
        if (this.winningId) {
            this.stats.finalWinner = this.winningId;
        }
    }
}
exports.Game = Game;
const numberOfGames = 1000;
const numberOfPlayers = 3;
const gameRules = [Rules_1.BasicWarRule, Rules_1.SpiritWarRule];
gameRules.forEach((gameRule) => {
    const HallOfStatistics = [];
    for (let gameNumber = 1; gameNumber < numberOfGames + 1; gameNumber++) {
        const stats = new StatisticsObject_1.StatisticsObject(numberOfPlayers, gameNumber);
        const game = new Game(gameRule, numberOfPlayers, stats);
        game.goToWar();
        HallOfStatistics.push(stats);
    }
    parseStatistics_1.parseStats(HallOfStatistics);
});
