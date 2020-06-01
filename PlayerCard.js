"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerCard = void 0;
class PlayerCard {
    constructor(card, playerId) {
        this.rank = card.rank;
        this.name = card.name;
        this.suit = card.suit;
        this.playerId = playerId;
    }
    get cardName() {
        return `The ${this.name} of ${this.suit}`;
    }
    reassignTo(playerId) {
        this.playerId = playerId;
    }
}
exports.PlayerCard = PlayerCard;
