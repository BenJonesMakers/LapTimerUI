import React, { useEffect, useRef } from 'react';

const RaceEntryDetails = ({ transponderId, filteredLaps = [], totalLapTime, position }) => {

    let currentLap = useRef(0);
    let lastLapTime = useRef(0.000);

    useEffect(() => {
        if (filteredLaps.length > 0) {
            currentLap.current = filteredLaps[filteredLaps.length - 1].lapNo;
            lastLapTime.current = filteredLaps[filteredLaps.length - 1].laptime;
        }
    }, [filteredLaps]);


    return (
        <>
            {transponderId && <div key={transponderId}>
                Position: {position + 1} -
                Car No: {transponderId}
                - Lap No: {currentLap.current}
                - Last Lap: {lastLapTime.current.toFixed(3)}
                - Total Laptime: {totalLapTime}
            </div>}
        </>
    )
}

export default RaceEntryDetails;
