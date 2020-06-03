export interface PlayerWins {
  wins: number;
  playerId: number;
}

export class StatisticsObject {
  turns = 0;
  numberOfWars = 0;
  warsWonByPlayer: PlayerWins[] = [];

  constructor(numberOfPlayers: number) {
    for (let i = 0; i < numberOfPlayers; i++) {
      this.warsWonByPlayer[i] = { playerId: i, wins: 0 };
    }
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
