var CardRankToName = {
    0: "Two",
    1: "Three",
    2: "Four",
    3: "Five",
    4: "Six",
    5: "Seven",
    6: "Eight",
    7: "Nine",
    8: "Ten",
    9: "Jack",
    10: "Queen",
    11: "King",
    12: "Ace"
};
var Suits = ["Clubs", "Hearts", "Spades", "Diamonds"];
function make52() {
    var newDeck = [];
    for (var suit = 0; suit < 4; suit++) {
        for (var i = 0; i < 13; i++) {
            newDeck.push({ rank: i, name: CardRankToName[i], suit: Suits[suit] });
        }
    }
    return shuffle(newDeck);
}
console.log(make52());
function shuffle(deck) {
    for (var i = 0; i < 1000; i++) {
        var location1 = Math.floor(Math.random() * deck.length);
        var location2 = Math.floor(Math.random() * deck.length);
        var tmp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
    return deck;
}
var Player = /** @class */ (function () {
    function Player(cards) {
        this.deck = cards;
    }
    Object.defineProperty(Player.prototype, "nextCard", {
        get: function () {
            return this.deck.length ? this.deck.shift() : this.shuffleCards();
        },
        enumerable: false,
        configurable: true
    });
    Player.prototype.shuffleCards = function () {
        if (this.usedCards.length === 0)
            return null;
        var nextCard = shuffle(this.usedCards).shift();
        this.deck = this.usedCards;
        this.usedCards = [];
        return nextCard;
    };
    return Player;
}());
