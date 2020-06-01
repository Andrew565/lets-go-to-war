const helpers = require("./helpers");

describe("make52", () => {
  it("should run without erroring", () => {
    expect(helpers.make52()).not.toThrow;
  });

  it("should make 52 cards", () => {
    const deck = helpers.make52();
    expect(deck.length).toBe(52);
  });
});

describe("shuffle", () => {
  it("should return a shuffled deck", () => {
    const deck = helpers.make52();
    const deckRanks = deck.map((card) => card.rank);

    const shuffledDeck = helpers.make52();
    const shuffledRanks = shuffledDeck.map((card) => card.rank);

    expect(deck.length).toBe(52);
    expect(shuffledDeck.length).toBe(52);

    expect(deckRanks).not.toEqual(shuffledRanks);
  });
});