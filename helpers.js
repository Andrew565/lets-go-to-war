"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlayerCards = exports.shuffle = exports.make52 = void 0;
const types_1 = require("./types");
const PlayerCard_1 = require("./PlayerCard");
function make52() {
    const newDeck = [];
    for (let suit = 0; suit < 4; suit++) {
        for (let i = 0; i < 13; i++) {
            newDeck.push({ rank: i, name: types_1.CardRankToName[i], suit: types_1.Suits[suit] });
        }
    }
    return shuffle(newDeck);
}
exports.make52 = make52;
function shuffle(deck) {
    for (var i = 0; i < 1000; i++) {
        var location1 = Math.floor(Math.random() * deck.length);
        var location2 = Math.floor(Math.random() * deck.length);
        var tmp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
    return deck;
}
exports.shuffle = shuffle;
function makePlayerCards(cards, playerId) {
    return cards.map((card) => new PlayerCard_1.PlayerCard(card, playerId));
}
exports.makePlayerCards = makePlayerCards;
