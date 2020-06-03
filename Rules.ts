import { Game, stats } from "./declare-war";
import { Player } from "./Player";
import { PlayerCard } from "./PlayerCard";

function getWarCards(activePlayers: Player[]) {
  return activePlayers.reduce((pot, player) => {
    const card = player.nextCard;

    if (card) {
      pot.push(new PlayerCard(card, player.id));
    } else {
      player.out = true;
    }

    return pot;
  }, [] as PlayerCard[]);
}

export function BasicWarRule(this: Game) {
  const activePlayers = this.activePlayers;
  const cardPot: PlayerCard[] = [];

  let winners = [] as PlayerCard[];

  while (winners.length !== 1) {
    const warringCards = getWarCards(activePlayers);
    cardPot.push(...warringCards);

    winners = BasicWarShowdown2(warringCards);

    if (winners.length > 1) {
      stats.incrementWars();
      const moreCards = this.activePlayers.reduce((pot, player) => {
        const nextThree: PlayerCard[] = player.getThree().map((card) => new PlayerCard(card, player.id));
        pot.push(...nextThree);
        return pot;
      }, [] as PlayerCard[]);
      cardPot.push(...moreCards);
    } else {
      stats.incrementPlayerWin(winners[0].playerId);
    }

    if (winners.length < 1) {
      console.error("Something went wrong in Basic War");
    }
  }

  cardPot.forEach((card) => card.reassignTo(winners[0].playerId));

  const winningPlayer = this.activePlayers.find((player) => player.id === winners[0].playerId);
  winningPlayer?.usedCards.push(...cardPot);
}

const BasicWarShowdown2 = (showdownCards: PlayerCard[]) => {
  let winners: PlayerCard[] = [];
  showdownCards.forEach((card) => {
    if (!winners[0]) {
      winners.push(card);
    } else if (card.rank > winners[0].rank) {
      winners = [card];
    } else if (card.rank === winners[0].rank) {
      winners.push(card);
    }
  });

  return winners;
};
