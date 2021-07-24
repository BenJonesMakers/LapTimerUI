import React from 'react';

const ListDrivers = (props) => {
  const { allDrivers = [] } = props;

  const driverList = allDrivers.map((driver) =>
    <li key={driver.transponderId}>{driver.transponderId} - {driver.realName}</li>
  );

  return (
    <>
      {driverList}
    </>
  );
}

export default ListDrivers;