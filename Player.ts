import { Card } from "./types";
import { shuffle, makePlayerCards } from "./helpers";

export class Player {
  id: number;
  deck: Card[];
  usedCards: Card[] = [];
  out: boolean = false;

  constructor(id: number, cards: Card[]) {
    this.id = id;
    this.deck = makePlayerCards(cards, this.id);
  }

  get nextCard(): Card | undefined {
    console.log("nextCard called for player #", this.id);
    console.log("player's deck and usedCards length", this.deck.length, this.usedCards.length);
    const retVal = this.deck.length > 0 ? this.deck.shift() : this.shuffleCards();
    console.log("retVal:", retVal);
    return retVal;
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
    this.deck = [...this.usedCards];
    this.usedCards = [];
    return nextCard;
  }

  get totalCards(): number {
    return this.deck.length + this.usedCards.length;
  }
}
