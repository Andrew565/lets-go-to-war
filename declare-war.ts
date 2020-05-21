interface Card {
  rank: number;
  name: string;
  suit: Suit;
}

const CardRankToName = [
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Jack",
  "Queen",
  "King",
  "Ace",
];

type Suit = "Clubs" | "Hearts" | "Spades" | "Diamonds";
const Suits: Suit[] = ["Clubs", "Hearts", "Spades", "Diamonds"];

type Deck = Card[];

type Rule = (p1Card: Card, p2Card: Card) => Card;

function make52(): Deck {
  const newDeck: Deck = [];
  for (let suit = 0; suit < 4; suit++) {
    for (let i = 0; i < 13; i++) {
      newDeck.push({ rank: i, name: CardRankToName[i], suit: Suits[suit] });
    }
  }
  return shuffle(newDeck);
}

console.log(make52());

function shuffle(deck: Deck) {
  for (var i = 0; i < 1000; i++) {
    var location1 = Math.floor(Math.random() * deck.length);
    var location2 = Math.floor(Math.random() * deck.length);
    var tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
  return deck;
}

class Player {
  deck: Deck;
  usedCards: Deck;

  constructor(cards: Deck) {
    this.deck = cards;
    this.usedCards = [];
  }

  get nextCard(): Card | undefined {
    return this.deck.length > 0 ? this.deck.shift() : this.shuffleCards();
  }

  shuffleCards(): Card | undefined {
    if (this.usedCards.length === 0) return undefined;

    const nextCard = shuffle(this.usedCards).shift();
    this.deck = this.usedCards;
    this.usedCards = [];
    return nextCard;
  }
}
