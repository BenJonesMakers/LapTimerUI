import React, { useState, useEffect } from 'react';
import speech from 'speech-js';

const RaceTimer = (props) => {
  const { countdownSeconds = 10, raceStatus, triggerRaceStart } = props;
  const [seconds, setSeconds] = useState(countdownSeconds);

  useEffect(() => {

    if (raceStatus === 'countdown') {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          if (seconds < 6) {
            speech.synthesis(seconds, 'en-US');
          }
          setSeconds(seconds - 1);
        } else {
          speech.synthesis('Go!', 'en-US');
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
