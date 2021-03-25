import React, { useState, useEffect } from 'react';

const RaceTimer = (props) => {

  const { initialMinute = 0, initialSeconds = 0, raceStatus } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (raceStatus === 'running') {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval)
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000)
      return () => {
        clearInterval(myInterval);
      };
    }
  });

  return (
    <div>
      { minutes === 0 && seconds === 0
        ? <h1>Race Over</h1>
        : <h1> Remaining: {minutes}m:{seconds < 10 ? `0${seconds}` : seconds}s</h1>
      }
    </div>
  )
}

export default RaceTimer;