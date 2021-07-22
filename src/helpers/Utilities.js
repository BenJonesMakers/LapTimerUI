export const generateRandomNumber = (max, min) => {
  return Math.random() * (max - min) + min;
}

export const getGap = (myRacePosition, myLapTime, sortedRacers) => {
  const opponentPosition = myRacePosition - 1;

  if (myRacePosition === 0) return '-----';

  if (sortedRacers.length && opponentPosition < sortedRacers.length) {
    const gap = myLapTime - sortedRacers[opponentPosition].totalTime;
    return '+' + Math.abs(gap.toFixed(3));
  }
}