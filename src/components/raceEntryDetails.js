import React, { useEffect, useRef } from 'react';

const RaceEntryDetails = ({ transponderId, filteredLaps = [], totalLapTime, position }) => {

    let currentLap = useRef(0);
    let lastLapTime = useRef(0.000);
    let formattedTotalLapTime = useRef(0.000);

    useEffect(() => {
        if (filteredLaps.length > 0) {
            currentLap.current = filteredLaps[filteredLaps.length - 1].lapNo;
            lastLapTime.current = filteredLaps[filteredLaps.length - 1].laptime;
        }
    }, [filteredLaps]);

    useEffect(() => {
        var minutes = Math.floor(totalLapTime / 60);
        var seconds = totalLapTime - minutes * 60;

        formattedTotalLapTime.current = minutes + 'm:' + seconds.toFixed(3) + 's';

    }, [totalLapTime]);


    return (
        <>
            {transponderId && <div key={transponderId}>
                Position: {position + 1} -
                Car No: {transponderId}
                - Lap No: {currentLap.current}
                - Last Lap: {lastLapTime.current.toFixed(3)}
                - Total Laptime: {formattedTotalLapTime.current}
            </div>}
        </>
    )
}

export default RaceEntryDetails;
