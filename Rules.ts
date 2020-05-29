import { Game } from "./declare-war";
import { PlayerCard } from "./PlayerCard";

function getWarCards(activePlayers: import("/Users/andrewsteele/Projects/Personal/lets-go-to-war/Player").Player[]) {
  return () =>
    activePlayers.reduce((pot, player) => {
      const card = player.nextCard;

      if (card) {
        pot.push(new PlayerCard(card, player.id));
      } else {
        player.out = true;
      }

      return pot;
    }, [] as PlayerCard[]);
}

export function BasicWarRule(this: Game) {
  const activePlayers = this.activePlayers;
  const cardPot: PlayerCard[] = [];

  const warCards = getWarCards(activePlayers);

  let winners = [] as PlayerCard[];

  while (winners.length !== 1) {
    const warringCards = warCards();
    cardPot.push(...warringCards);
    winners = BasicWarShowdown(warringCards);
    if (winners.length > 1) {
      const moreCards = this.activePlayers.reduce((pot, player) => {
        const nextThree: PlayerCard[] = player.getThree().map((card) => new PlayerCard(card, player.id));
        pot.push(...nextThree);
        return pot;
      }, [] as PlayerCard[]);
      cardPot.push(...moreCards);
      console.log("Declaring WAR");
    }
  }

  cardPot.forEach((card) => card.giveTo(winners[0].playerId));
  const winningPlayer = this.activePlayers.find((player) => player.id === winners[0].playerId);
  winningPlayer?.usedCards.push(...cardPot);
}

const BasicWarShowdown = (cardPot: PlayerCard[]) =>
  cardPot.reduce((highCards: PlayerCard[], playerCard): PlayerCard[] => {
    const { rank: playerRank } = playerCard;
    const { rank: highRank } = highCards[0];

    if (playerRank > highRank) {
      highCards = [playerCard];
    } else if (playerRank === highRank) {
      highCards.push(playerCard);
    }

    return highCards;
  }, [] as PlayerCard[]);
