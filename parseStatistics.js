"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStats = void 0;
exports.parseStats = (HallOfStatistics) => {
    const numberOfStats = HallOfStatistics.length;
    console.log("numberOfStats:", numberOfStats);
    const averageNumberOfTurns = HallOfStatistics.reduce((acc, stat) => {
        acc += stat.turns;
        return acc;
    }, 0) / numberOfStats;
    console.log("averageNumberOfTurns:", averageNumberOfTurns);
    const averageNumberOfWars = HallOfStatistics.reduce((acc, stat) => {
        acc += stat.numberOfWars;
        return acc;
    }, 0) / numberOfStats;
    console.log("averageNumberOfWars:", averageNumberOfWars);
    const numberOfPlayers = HallOfStatistics[0].warsWonByPlayer.length;
    const totalWarsWonByPlayer = HallOfStatistics.reduce((acc, stat) => {
        stat.warsWonByPlayer.forEach((playerWin, i) => (acc[i] += playerWin.wins));
        return acc;
    }, []);
    const averageWarsWonByPlayer = totalWarsWonByPlayer.map((wins) => wins / numberOfPlayers);
    console.log("averageWarsWonByPlayer:", averageWarsWonByPlayer);
    const timesPlayerWon = HallOfStatistics.reduce((acc, stat) => {
        acc[stat.finalWinner] += 1;
        return acc;
    }, []);
    console.log("timesPlayerWon", timesPlayerWon);
};
