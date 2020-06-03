"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsObject = void 0;
class StatisticsObject {
    constructor(numberOfPlayers, gameNumber) {
        this.turns = 0;
        this.numberOfWars = 0;
        this.warsWonByPlayer = [];
        this.finalWinner = 0;
        for (let i = 0; i < numberOfPlayers; i++) {
            this.warsWonByPlayer[i] = { playerId: i, wins: 0 };
        }
        this.gameNumber = gameNumber;
    }
    incrementTurns() {
        this.turns++;
    }
    incrementWars() {
        this.numberOfWars++;
    }
    incrementPlayerWin(playerId) {
        this.warsWonByPlayer[playerId].wins++;
    }
}
exports.StatisticsObject = StatisticsObject;
