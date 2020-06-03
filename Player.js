"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const helpers_1 = require("./helpers");
class Player {
    constructor(id, cards) {
        this.usedCards = [];
        this.out = false;
        this.id = id;
        this.deck = helpers_1.makePlayerCards(cards, this.id);
    }
    get nextCard() {
        return this.deck.length > 0 ? this.deck.shift() : this.shuffleCards();
    }
    getThree() {
        const retVal = [];
        for (let i = 0; i < 3; i++) {
            const nextCard = this.nextCard;
            if (nextCard)
                retVal.push(nextCard);
        }
        return retVal;
    }
    shuffleCards() {
        if (this.usedCards.length === 0)
            return undefined;
        const nextCard = helpers_1.shuffle(this.usedCards).shift();
        this.deck = this.usedCards;
        this.usedCards = [];
        return nextCard;
    }
    get totalCards() {
        return this.deck.length + this.usedCards.length;
    }
}
exports.Player = Player;
