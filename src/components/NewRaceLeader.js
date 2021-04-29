import React, { useEffect } from 'react';
import speech from 'speech-js';
import getRealName from '../helpers/TransponderLookup';

const NewRaceLeader = ({ newLeader }) => {

  useEffect(() => {
    speech.synthesis(`We have a new race leader, it's ${getRealName(newLeader)}`, 'en-US');
  }, [newLeader]);

  return (
    <div>
      We have a new race leader!  It's {getRealName(newLeader)}
    </div>
  )
}

export default NewRaceLeader;