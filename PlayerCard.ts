import { Card } from "./types";

export class PlayerCard {
  card: Card;
  playerId: number;

  constructor(card: Card, playerId: number) {
    this.card = card;
    this.playerId = playerId;
  }

  get rank(): number {
    return this.card.rank;
  }

  get cardName(): string {
    return `The ${this.card.name}`;
  }

  giveTo(playerId: number) {
    this.playerId = playerId;
  }
}
