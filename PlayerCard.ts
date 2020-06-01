import { Card, Suit } from "./types";

export class PlayerCard implements Card {
  rank: number;
  name: string;
  suit: Suit;
  playerId: number;

  constructor(card: Card, playerId: number) {
    this.rank = card.rank;
    this.name = card.name;
    this.suit = card.suit;
    this.playerId = playerId;
  }

  get cardName(): string {
    return `The ${this.name} of ${this.suit}`;
  }

  reassignTo(playerId: number) {
    this.playerId = playerId;
  }
}
