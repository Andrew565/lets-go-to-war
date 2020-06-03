import { Card } from "./types";
import { shuffle } from "./helpers";

let nextPlayerId = 0;

export class Player {
  id: number;
  deck: Card[];
  usedCards: Card[];
  out: boolean = false;

  constructor(cards: Card[]) {
    this.id = nextPlayerId++;
    this.deck = cards;
    this.usedCards = [];
  }

  get nextCard(): Card | undefined {
    return this.deck.length > 0 ? this.deck.shift() : this.shuffleCards();
  }

  getThree(): Card[] {
    const retVal: Card[] = [];
    for (let i = 0; i < 3; i++) {
      const nextCard = this.nextCard;
      if (nextCard) retVal.push(nextCard);
    }
    return retVal;
  }

  shuffleCards(): Card | undefined {
    if (this.usedCards.length === 0) return undefined;
    const nextCard = shuffle(this.usedCards).shift();
    this.deck = this.usedCards;
    this.usedCards = [];
    return nextCard;
  }

  get totalCards(): number {
    return this.deck.length + this.usedCards.length;
  }
}
