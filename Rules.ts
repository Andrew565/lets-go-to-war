import { Game } from "./declare-war";
import { Player } from "./Player";
import { PlayerCard } from "./PlayerCard";

function getWarCards(activePlayers: Player[]) {
  console.log("getWarCards called with: ", activePlayers);
  return activePlayers.reduce((pot, player) => {
    const card = player.nextCard;
    console.log("card:", card);

    if (card) {
      pot.push(new PlayerCard(card, player.id));
    } else {
      player.out = true;
    }

    return pot;
  }, [] as PlayerCard[]);
}

export function BasicWarRule(this: Game) {
  console.log("BasicWarRule called");
  const activePlayers = this.activePlayers;
  const cardPot: PlayerCard[] = [];

  let winners = [] as PlayerCard[];

  while (winners.length !== 1) {
    const warringCards = getWarCards(activePlayers);
    console.log("warringCards:", warringCards);
    cardPot.push(...warringCards);

    winners = BasicWarShowdown2(warringCards);
    console.log("BasicWar round winners:", winners);

    if (winners.length > 1) {
      console.log("War will be declared");
      const moreCards = this.activePlayers.reduce((pot, player) => {
        const nextThree: PlayerCard[] = player.getThree().map((card) => new PlayerCard(card, player.id));
        pot.push(...nextThree);
        return pot;
      }, [] as PlayerCard[]);
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
  winningPlayer?.usedCards.push(...cardPot);
}

const BasicWarShowdown2 = (showdownCards: PlayerCard[]) => {
  console.log("BasicWarShowdown2 called with:", showdownCards);

  let winners: PlayerCard[] = [];
  showdownCards.forEach((card) => {
    console.log("winners at start of round:", winners);

    if (!winners[0]) {
      winners.push(card);
    } else if (card.rank > winners[0].rank) {
      winners = [card];
    } else if (card.rank === winners[0].rank) {
      winners.push(card);
    }

    console.log("winners at end of round:", winners);
  });

  return winners;
};
