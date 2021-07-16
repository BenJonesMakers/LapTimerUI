import React, { useState, useEffect } from 'react';

const RaceTimer = (props) => {
  const { countdownSeconds = 10, raceStatus, triggerRaceStart } = props;
  const [seconds, setSeconds] = useState(countdownSeconds);

  useEffect(() => {
    if (raceStatus === 'countdown') {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          triggerRaceStart();
        }
      }, 1000)
      return () => {
        clearInterval(myInterval);
      };
    }
  });

  return (
    <div>
      {seconds === 0
        ? <h1>Starting</h1>
        : <h1> Countdown: {seconds < 10 ? `0${seconds}` : seconds}s</h1>
      }
    </div>
  )
}

export default RaceTimer;
