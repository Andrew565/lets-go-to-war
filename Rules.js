"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicWarRule = void 0;
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
function BasicWarRule() {
    const activePlayers = this.activePlayers;
    const cardPot = [];
    let winners = [];
    while (winners.length !== 1) {
        const warringCards = getWarCards(activePlayers);
        cardPot.push(...warringCards);
        winners = BasicWarShowdown2(warringCards);
        if (winners.length > 1) {
            const moreCards = this.activePlayers.reduce((pot, player) => {
                const nextThree = player.getThree().map((card) => new PlayerCard_1.PlayerCard(card, player.id));
                pot.push(...nextThree);
                return pot;
            }, []);
            cardPot.push(...moreCards);
        }
        if (winners.length < 1) {
            console.error("Something went wrong in Basic War");
        }
    }
    cardPot.forEach((card) => card.reassignTo(winners[0].playerId));
    const winningPlayer = this.activePlayers.find((player) => player.id === winners[0].playerId);
    console.info("BasicWarRule: This Round's Winning Player:", winningPlayer === null || winningPlayer === void 0 ? void 0 : winningPlayer.id);
    winningPlayer === null || winningPlayer === void 0 ? void 0 : winningPlayer.usedCards.push(...cardPot);
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
