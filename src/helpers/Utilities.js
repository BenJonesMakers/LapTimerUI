export const generateRandomNumber = (max, min) => {
  return Math.random() * (max - min) + min;
}

export const filteredLaps = (transponder, laps) => {
  return laps.filter(lap => lap.transponderId === transponder);
}

export const totalLapTime = (filteredLaps) => {
  var totalLapTimeByTransponder = filteredLaps.reduce(function (prev, current) {
    return prev + current.laptime
  }, 0);

  return totalLapTimeByTransponder.toFixed(3);
}

export const getGap = (myRacePosition, myLapTime, filteredAndSortedLaps) => {
  const opponentPosition = myRacePosition - 1;

  if (myRacePosition === 0) return '+++';

  if (filteredAndSortedLaps.length && opponentPosition < filteredAndSortedLaps.length) {
    const gap = myLapTime - filteredAndSortedLaps[opponentPosition].totalLapTime;
    return gap.toFixed(3);
  }
}