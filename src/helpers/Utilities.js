export const generateRandomNumber = (max, min) => {
  return Math.random() * (max - min) + min;
}

export const getGap = (myRacePosition, myLapTime, filteredAndSortedLaps) => {
  const opponentPosition = myRacePosition - 1;

  if (myRacePosition === 0) return '-----';

  if (filteredAndSortedLaps.length && opponentPosition < filteredAndSortedLaps.length) {
    const gap = myLapTime - filteredAndSortedLaps[opponentPosition].totalLapTime;
    return '+' + Math.abs(gap.toFixed(3));
  }
}