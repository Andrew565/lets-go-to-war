import { Game } from "./declare-war";
import { Player } from "./Player";
import { PlayerCard } from "./PlayerCard";
import { Suit } from "./types";

function getWarCards(activePlayers: Player[]) {
  return activePlayers.reduce((pot, player) => {
    if (player.out) return pot;

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
    console.log("warringCards:", warringCards);

    cardPot.push(...warringCards);
    winners = SpiritWarShowdown(warringCards);
    console.log("Spirit war winners:", winners);

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

  console.log("cardPot before assignment", cardPot);
  cardPot.forEach((card) => card.reassignTo(winners[0].playerId));
  console.log("cardPot after assignment", cardPot);

  const winningPlayer = this.activePlayers.find((player) => player.id === winners[0].playerId);
  console.log("winningPlayer, used cards length:", winningPlayer, winningPlayer ? winningPlayer.usedCards.length : 0);
  winningPlayer && winningPlayer.usedCards.push(...cardPot);
}

const trumpCards: { [x: string]: Suit } = {
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

export function SpiritWarShowdown(showdownCards: PlayerCard[]) {
  console.log("SpiritWarShowdown called with", showdownCards);
  let winners: PlayerCard[] = [];
  showdownCards.sort((a, b) => a.rank - b.rank);
  winners.push(showdownCards[0]);

  showdownCards.forEach((card) => {
    if (card.rank > winners[0].rank + cardRankDistance) {
      winners = [card];
    } else if (card.rank >= winners[0].rank - cardRankDistance) {
      winners = checkForTrump(card, winners);
    }
  });

  return winners;
}

class TrumpChecker {
  card: PlayerCard;
  highCard: PlayerCard;

  constructor(card: PlayerCard, highCard: PlayerCard) {
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

export function checkForTrump(card: PlayerCard, winners: PlayerCard[]) {
  const trumpChecker = new TrumpChecker(card, winners[0]);

  if (trumpChecker.cardWins()) winners.push(card);

  return winners;
}
