import React, { useEffect, useRef, useState } from 'react';

const RaceEntryDetails = ({ transponderId, filteredLaps }) => {

    let currentLap = useRef(0);
    let lastLapTime = useRef(0.000);

    const [totalLapTime, setTotalLapTime] = useState(0);

    useEffect(() => {
        if (filteredLaps) {
            currentLap.current = filteredLaps[filteredLaps.length - 1].lapNo;
            lastLapTime.current = filteredLaps[filteredLaps.length - 1].laptime;

            let allLaps = filteredLaps.reduce(function (prev, current) {
                return prev + +current.laptime
            }, 0);

            setTotalLapTime(allLaps.toFixed(3));
        }
    }, [filteredLaps]);


    return (
        <>
            {transponderId && <div key={transponderId}>
                Car No: {transponderId}
                - Lap No: {currentLap.current}
                - Last Lap: {lastLapTime.current.toFixed(3)}
                - Total Laptime: {totalLapTime}
            </div>}
        </>
    )
}

export default RaceEntryDetails;
