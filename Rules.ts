import { Game } from "./declare-war";
import { Player } from "./Player";
import { PlayerCard } from "./PlayerCard";
import { Suit } from "./types";

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

// Basic (Original) War

export function BasicWarRule(this: Game) {
  const activePlayers = this.activePlayers;
  const cardPot: PlayerCard[] = [];

  let winners = [] as PlayerCard[];

  while (winners.length !== 1) {
    const warringCards = getWarCards(activePlayers);
    cardPot.push(...warringCards);

    winners = BasicWarShowdown2(warringCards);

    if (winners.length > 1) {
      this.stats.incrementWars();
      const moreCards = this.activePlayers.reduce((pot, player) => {
        const nextThree: PlayerCard[] = player.getThree().map((card) => new PlayerCard(card, player.id));
        pot.push(...nextThree);
        return pot;
      }, [] as PlayerCard[]);
      cardPot.push(...moreCards);
    } else {
      this.stats.incrementPlayerWin(winners[0].playerId);
    }
  }

  cardPot.forEach((card) => card.reassignTo(winners[0].playerId));

  const winningPlayer = this.activePlayers.find((player) => player.id === winners[0].playerId);
  winningPlayer && winningPlayer.usedCards.push(...cardPot);
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

// SpiritWar

export function SpiritWarRule(this: Game) {
  const activePlayers = this.activePlayers;
  const cardPot: PlayerCard[] = [];

  let winners = [] as PlayerCard[];

  while (winners.length !== 1) {
    const warringCards = getWarCards(activePlayers);
    cardPot.push(...warringCards);
    winners = SpiritWarShowdown(warringCards);

    if (winners.length > 1) {
      this.stats.incrementWars();
      const moreCards = this.activePlayers.reduce((pot, player) => {
        const nextThree: PlayerCard[] = player.getThree().map((card) => new PlayerCard(card, player.id));
        pot.push(...nextThree);
        return pot;
      }, [] as PlayerCard[]);
      cardPot.push(...moreCards);
    } else {
      this.stats.incrementPlayerWin(winners[0].playerId);
    }
  }

  cardPot.forEach((card) => card.reassignTo(winners[0].playerId));

  const winningPlayer = this.activePlayers.find((player) => player.id === winners[0].playerId);
  winningPlayer && winningPlayer.usedCards.push(...cardPot);
}

/**
 * Spirit War Trump Mappings:
 *
 * Hearts (Love) --beats--> Spades (Death)
 * Spades (Death) --> Diamonds (Wealth)
 * Diamonds (Wealth) --> Clubs (Labor)
 * Clubs (Labor) --> Hearts (Love)
 */

const trumpCards: { [x: string]: Suit } = {
  Hearts: "Spades",
  Spades: "Diamonds",
  Diamonds: "Clubs",
  Clubs: "Hearts",
};

// How close does the trump card's rank need to be to trigger a war
const cardRankDistance = 2;

export function SpiritWarShowdown(showdownCards: PlayerCard[]) {
  let winners: PlayerCard[] = [];
  showdownCards.sort((a, b) => a.rank - b.rank);

  showdownCards.forEach((card, i, cards) => {
    const nextCard = cards[i + 1];
    if (!nextCard || card.rank + cardRankDistance < nextCard.rank) return;

    if (card.rank > nextCard.rank)
  })

  return winners;
}
