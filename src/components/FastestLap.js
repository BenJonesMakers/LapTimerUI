import React from 'react';
import getRealName from '../helpers/TransponderLookup';

const FastestLap = (props) => {
  const { transponder, lapTime = 0 } = props.fastestLap;

  return (
    <>
      {transponder ? `Fastest Lap: ${lapTime.toFixed(3)} by ${getRealName(transponder)}` : 'No fastest lap recorded'}
    </>
  )
}

export default FastestLap;