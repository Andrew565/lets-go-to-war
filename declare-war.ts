import { Rule, Card } from "./types";
import { Player } from "./Player";
import { make52 } from "./helpers";
import { BasicWarRule } from "./Rules";

export class Game {
  deck: Card[];
  players: Player[] = [];
  rule: Rule;
  gameOver: boolean = false;
  round: number = 1;
  winningId: number | undefined = undefined;

  constructor(rule: Rule, numPlayers: number) {
    this.deck = make52();

    for (var num = 0; num < numPlayers; num++) {
      const cards = this.deck.splice(0, Math.ceil(52 / numPlayers));
      this.players.push(new Player(cards));
    }

    this.rule = rule.bind(this);
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
    console.log("goToWar called");
    let turnCount = 1;
    while (!this.gameOver) {
      console.log("Turn #", ++turnCount);
      this.rule();
      this.gameOver = this.checkForWinner();
    }

    if (this.winningId) console.log("The winner is:", this.players[this.winningId]);
  }
}

console.log("Starting Basic War");
const game = new Game(BasicWarRule, 2);
game.goToWar();
