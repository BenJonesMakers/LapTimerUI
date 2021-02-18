import React, { useEffect, useRef } from 'react';

const RaceEntryDetails = ({transponderId, laps}) => {

    let currentLap = useRef(0);
    let lastLapTime = useRef(0.000);

    useEffect(() => {

        if (laps.length) {
            var thisTranspondersLaps = laps.filter(lap => lap.transponderId === transponderId);
            currentLap.current = thisTranspondersLaps[thisTranspondersLaps.length - 1].lapNo;
            lastLapTime.current = thisTranspondersLaps[thisTranspondersLaps.length - 1].laptime;
        }
    });

  
    return (
        <>
        {transponderId && <div key={transponderId}>
            Car No: {transponderId} - Lap No: {currentLap.current} - Last Lap: {lastLapTime.current.toFixed(3)}
        </div>}
        </>
    ) 
}

export default RaceEntryDetails;
