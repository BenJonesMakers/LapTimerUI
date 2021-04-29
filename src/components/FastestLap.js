import React, { useEffect } from 'react';
import getRealName from '../helpers/TransponderLookup';
import speech from 'speech-js';

const FastestLap = (props) => {
  const { transponder, lapTime = 0 } = props.fastestLap;

  useEffect(() => {
    speech.synthesis(getRealName(transponder) + ', just did an, ' + lapTime.toFixed(3), 'en-US')
  }, [transponder, lapTime]);


  return (
    <>
      {transponder ? `Fastest Lap: ${lapTime.toFixed(3)} by ${getRealName(transponder)}` : 'No fastest lap recorded'}
    </>
  )
}

export default FastestLap;