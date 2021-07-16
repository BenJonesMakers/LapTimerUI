import React, { useEffect } from 'react';
import getRealName from '../helpers/TransponderLookup';
import speech from 'speech-js';

const FastestLap = (props) => {
  const { transponder, lapTime = 0 } = props.fastestLap;

  useEffect(() => {
    if (lapTime > 0 && lapTime < 9999) {
      speech.synthesis(getRealName(transponder) + ', just did a , ' + lapTime.toFixed(3), 'en-US');
    }
  }, [transponder, lapTime]);


  return (
    <h4>
      {transponder ? `Fastest Lap: ${lapTime.toFixed(3)} by ${getRealName(transponder)}` : 'No fastest lap recorded'}
    </h4>
  )
}

export default FastestLap;