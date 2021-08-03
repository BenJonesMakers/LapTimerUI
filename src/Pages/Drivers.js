import React, { useEffect, useState } from 'react';
import AddDriver from '../components/AddDriver';
import ListDrivers from '../components/ListDrivers';

const Drivers = (props) => {

  const [drivers, setDrivers] = useState(props.allDrivers);

  async function fetchDrivers() {

    try {
      const response = await fetch('http://localhost:3001/drivers', {
        method: 'get'
      });
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      response.json().then(function (data) {
        setDrivers(data);
      });
    } catch (err) {
      console.log('Fetch Error :-S', err);
    }
  }

  useEffect(() => {
    fetchDrivers();
  }, [])

  return (
    <>
      <h1>Drivers</h1>
      {
        drivers ? <ListDrivers allDrivers={drivers} /> : <h1> Loading </h1>
      }
      <AddDriver />
    </>
  );
}

export default Drivers;
