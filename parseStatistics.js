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
    const totalWars = HallOfStatistics.reduce((acc, stat) => {
        acc += stat.numberOfWars;
        return acc;
    }, 0);
    const averageNumberOfWars = totalWars / numberOfStats;
    console.log("averageNumberOfWars:", averageNumberOfWars);
    const totalWarsWonByPlayer = HallOfStatistics.reduce((acc, stat) => {
        stat.warsWonByPlayer.forEach((playerWin) => {
            if (!acc[playerWin.playerId])
                acc[playerWin.playerId] = 0;
            acc[playerWin.playerId] += playerWin.wins;
        });
        return acc;
    }, []);
    const averageWarsWonByPlayer = totalWarsWonByPlayer.map((wins) => wins / totalWars);
    console.log("averageWarsWonByPlayer:", averageWarsWonByPlayer);
    const timesPlayerWon = HallOfStatistics.reduce((acc, stat) => {
        if (!acc[stat.finalWinner])
            acc[stat.finalWinner] = 0;
        acc[stat.finalWinner]++;
        return acc;
    }, []);
    console.log("timesPlayerWon", timesPlayerWon);
};
