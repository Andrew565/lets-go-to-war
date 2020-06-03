export interface PlayerWins {
  wins: number;
  playerId: number;
}

export class StatisticsObject {
  gameNumber: number;
  turns = 0;
  numberOfWars = 0;
  warsWonByPlayer: PlayerWins[] = [];
  finalWinner: number = 0;

  constructor(numberOfPlayers: number, gameNumber: number) {
    for (let i = 0; i < numberOfPlayers; i++) {
      this.warsWonByPlayer[i] = { playerId: i, wins: 0 };
    }

    this.gameNumber = gameNumber;
  }

  incrementTurns() {
    this.turns++;
  }

  incrementWars() {
    this.numberOfWars++;
  }

  incrementPlayerWin(playerId: number) {
    this.warsWonByPlayer[playerId].wins++;
  }
}
