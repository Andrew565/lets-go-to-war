import { CardRankToName, Suits, Card } from "./types";
import { PlayerCard } from "./PlayerCard";

export function make52(): Card[] {
  const newDeck: Card[] = [];
  for (let suit = 0; suit < 4; suit++) {
    for (let i = 0; i < 13; i++) {
      newDeck.push({ rank: i, name: CardRankToName[i], suit: Suits[suit] });
    }
  }

  return shuffle(newDeck);
}

export function shuffle(deck: Card[]) {
  for (var i = 0; i < 1000; i++) {
    var location1 = Math.floor(Math.random() * deck.length);
    var location2 = Math.floor(Math.random() * deck.length);
    var tmp = deck[location1];
    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
  return deck;
}

export function makePlayerCards(cards: Card[], playerId: number) {
  return cards.map((card) => new PlayerCard(card, playerId));
}
