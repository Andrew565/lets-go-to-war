import { Rule, Card } from "./types";
import { Player } from "./Player";
import { make52 } from "./helpers";
import { BasicWarRule } from "./Rules";
import { StatisticsObject } from "./StatisticsObject";
import { parseStats } from "./parseStatistics";

export class Game {
  deck: Card[];
  players: Player[] = [];
  rule: Rule;
  gameOver: boolean = false;
  round: number = 1;
  winningId: number | undefined = undefined;
  stats: StatisticsObject;

  constructor(rule: Rule, numPlayers: number, stats: StatisticsObject) {
    this.deck = make52();

    for (var num = 0; num < numPlayers; num++) {
      const cards = this.deck.splice(0, Math.ceil(52 / numPlayers));
      this.players.push(new Player(num, cards));
    }

    this.rule = rule.bind(this);
    this.stats = stats;
  }

  get activePlayers(): Player[] {
    return this.players.filter((player) => player.totalCards > 0);
  }

  checkForWinner = (): boolean => {
    if (this.activePlayers.length === 1) {
      this.winningId = this.activePlayers[0].id;
      return true;
    }
    return false;
  };

  goToWar() {
    while (!this.gameOver) {
      this.stats.incrementTurns();
      this.rule();
      this.gameOver = this.checkForWinner();
    }

    if (this.winningId) {
      this.stats.finalWinner = this.winningId;
    }
  }
}

const numberOfGames = 1000;
const numberOfPlayers = 3;
const HallOfStatistics: StatisticsObject[] = [];

for (let gameNumber = 1; gameNumber < numberOfGames + 1; gameNumber++) {
  const stats = new StatisticsObject(numberOfPlayers, gameNumber);

  const game = new Game(BasicWarRule, numberOfPlayers, stats);
  game.goToWar();
  HallOfStatistics.push(stats);
}

parseStats(HallOfStatistics);
