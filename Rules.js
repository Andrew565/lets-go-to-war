"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicWarRule = void 0;
const PlayerCard_1 = require("./PlayerCard");
function getWarCards(activePlayers) {
    console.log("getWarCards called with: ", activePlayers);
    return activePlayers.reduce((pot, player) => {
        const card = player.nextCard;
        console.log("card:", card);
        if (card) {
            pot.push(new PlayerCard_1.PlayerCard(card, player.id));
        }
        else {
            player.out = true;
        }
        return pot;
    }, []);
}
function BasicWarRule() {
    console.log("BasicWarRule called");
    const activePlayers = this.activePlayers;
    const cardPot = [];
    let winners = [];
    while (winners.length !== 1) {
        const warringCards = getWarCards(activePlayers);
        console.log("warringCards:", warringCards);
        cardPot.push(...warringCards);
        winners = BasicWarShowdown2(warringCards);
        console.log("BasicWar round winners:", winners);
        if (winners.length > 1) {
            console.log("War will be declared");
            const moreCards = this.activePlayers.reduce((pot, player) => {
                const nextThree = player.getThree().map((card) => new PlayerCard_1.PlayerCard(card, player.id));
                pot.push(...nextThree);
                return pot;
            }, []);
            cardPot.push(...moreCards);
            console.log("Declaring WAR");
        }
        if (winners.length < 1) {
            console.log("Something went wrong in Basic War");
        }
    }
    console.log("Number of cards per player before reassignment:");
    this.activePlayers.forEach((player) => console.log(`Player id: ${player.id}, cards: ${player.deck.length}`));
    cardPot.forEach((card) => card.reassignTo(winners[0].playerId));
    console.log("Number of cards per player after reassignment:");
    this.activePlayers.forEach((player) => console.log(`Player id: ${player.id}, cards: ${player.deck.length}`));
    const winningPlayer = this.activePlayers.find((player) => player.id === winners[0].playerId);
    console.log("Winning Player:", winningPlayer);
    winningPlayer === null || winningPlayer === void 0 ? void 0 : winningPlayer.usedCards.push(...cardPot);
}
exports.BasicWarRule = BasicWarRule;
const BasicWarShowdown2 = (showdownCards) => {
    console.log("BasicWarShowdown2 called with:", showdownCards);
    let winners = [];
    showdownCards.forEach((card) => {
        console.log("winners at start of round:", winners);
        if (!winners[0]) {
            winners.push(card);
        }
        else if (card.rank > winners[0].rank) {
            winners = [card];
        }
        else if (card.rank === winners[0].rank) {
            winners.push(card);
        }
        console.log("winners at end of round:", winners);
    });
    return winners;
};
