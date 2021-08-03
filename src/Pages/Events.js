import React, { useState, useEffect } from 'react';
import ArchiveRace from '../components/ArchiveRace';

const Events = () => {

  const [archiveRaces, setArchiveRaces] = useState([]);

  async function fetchArchiveRaces() {

    try {
      const response = await fetch('http://localhost:3001/events', {
        method: 'get'
      });
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      response.json().then(function (data) {
        setArchiveRaces(data);
      });
    } catch (err) {
      console.log('Fetch Error :-S', err);
    }
  }

  useEffect(() => {
    fetchArchiveRaces();
  }, [])

  return (
    <>
      <h1>Previous Races</h1>
      <ArchiveRace archiveRaces={archiveRaces} />
    </>
  );
}

export default Events;