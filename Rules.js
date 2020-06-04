"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForTrump = exports.SpiritWarShowdown = exports.SpiritWarRule = exports.BasicWarRule = void 0;
const PlayerCard_1 = require("./PlayerCard");
function getWarCards(activePlayers) {
    return activePlayers.reduce((pot, player) => {
        const card = player.nextCard;
        if (card) {
            pot.push(new PlayerCard_1.PlayerCard(card, player.id));
        }
        else {
            player.out = true;
        }
        return pot;
    }, []);
}
// Basic (Original) War
function BasicWarRule() {
    const activePlayers = this.activePlayers;
    const cardPot = [];
    let winners = [];
    while (winners.length !== 1) {
        const warringCards = getWarCards(activePlayers);
        cardPot.push(...warringCards);
        winners = BasicWarShowdown2(warringCards);
        if (winners.length > 1) {
            this.stats.incrementWars();
            const moreCards = this.activePlayers.reduce((pot, player) => {
                const nextThree = player.getThree().map((card) => new PlayerCard_1.PlayerCard(card, player.id));
                pot.push(...nextThree);
                return pot;
            }, []);
            cardPot.push(...moreCards);
        }
        else {
            this.stats.incrementPlayerWin(winners[0].playerId);
        }
    }
    cardPot.forEach((card) => card.reassignTo(winners[0].playerId));
    const winningPlayer = this.activePlayers.find((player) => player.id === winners[0].playerId);
    winningPlayer && winningPlayer.usedCards.push(...cardPot);
}
exports.BasicWarRule = BasicWarRule;
const BasicWarShowdown2 = (showdownCards) => {
    let winners = [];
    showdownCards.forEach((card) => {
        if (!winners[0]) {
            winners.push(card);
        }
        else if (card.rank > winners[0].rank) {
            winners = [card];
        }
        else if (card.rank === winners[0].rank) {
            winners.push(card);
        }
    });
    return winners;
};
// SpiritWar
function SpiritWarRule() {
    const activePlayers = this.activePlayers;
    const cardPot = [];
    let winners = [];
    while (winners.length !== 1) {
        const warringCards = getWarCards(activePlayers);
        cardPot.push(...warringCards);
        winners = SpiritWarShowdown(warringCards);
        if (winners.length > 1) {
            this.stats.incrementWars();
            const moreCards = this.activePlayers.reduce((pot, player) => {
                const nextThree = player.getThree().map((card) => new PlayerCard_1.PlayerCard(card, player.id));
                pot.push(...nextThree);
                return pot;
            }, []);
            cardPot.push(...moreCards);
        }
        else {
            this.stats.incrementPlayerWin(winners[0].playerId);
        }
    }
    cardPot.forEach((card) => card.reassignTo(winners[0].playerId));
    const winningPlayer = this.activePlayers.find((player) => player.id === winners[0].playerId);
    winningPlayer && winningPlayer.usedCards.push(...cardPot);
}
exports.SpiritWarRule = SpiritWarRule;
const trumpCards = {
    /**
     * Spirit War Trump Mappings:
     *
     * Hearts (Love) --beats--> Spades (Death)
     * Spades (Death) --> Diamonds (Wealth)
     * Diamonds (Wealth) --> Clubs (Labor)
     * Clubs (Labor) --> Hearts (Love)
     */
    Hearts: "Spades",
    Spades: "Diamonds",
    Diamonds: "Clubs",
    Clubs: "Hearts",
};
// How close does the trump card's rank need to be to trigger a war
const cardRankDistance = 2;
function SpiritWarShowdown(showdownCards) {
    let winners = [];
    showdownCards.sort((a, b) => a.rank - b.rank);
    winners.push(showdownCards[0]);
    showdownCards.forEach((card) => {
        if (card.rank > winners[0].rank + cardRankDistance) {
            winners = [card];
        }
        else if (card.rank >= winners[0].rank - cardRankDistance) {
            winners = checkForTrump(card, winners);
        }
    });
    return winners;
}
exports.SpiritWarShowdown = SpiritWarShowdown;
class TrumpChecker {
    constructor(card, highCard) {
        this.card = card;
        this.highCard = highCard;
    }
    cardWins() {
        return this.cardBeats() || this.cardTrumps();
    }
    cardBeats() {
        const cardRankHighEnough = this.card.rank > this.highCard.rank;
        const highCardCanNotTrump = this.highCard.suit !== trumpCards[this.card.suit];
        return cardRankHighEnough && highCardCanNotTrump;
    }
    cardCanTrump() {
        const cardIsTrumpCard = trumpCards[this.highCard.suit] === this.card.suit;
        const cardIsWithinRank = this.card.rank >= this.highCard.rank - cardRankDistance;
        return cardIsTrumpCard && cardIsWithinRank;
    }
    cardTrumps() {
        return this.cardBeats() || this.cardCanTrump();
    }
}
function checkForTrump(card, winners) {
    const trumpChecker = new TrumpChecker(card, winners[0]);
    if (trumpChecker.cardWins())
        winners.push(card);
    return winners;
}
exports.checkForTrump = checkForTrump;
