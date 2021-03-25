import React, { useEffect, useRef } from 'react';

const RaceEntryDetails = ({ transponderId, filteredLaps = [], totalLapTime, position }) => {

    let currentLap = useRef(0);
    let lastLapTime = useRef(0.000);
    let formattedTotalLapTime = useRef(0.000);
    let randomColor = useRef('000000');

    useEffect(() => {
        randomColor.current = Math.floor(Math.random() * 16777215).toString(16);
    }, []);

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
                <h3 style={{ color: '#' + randomColor.current }}>Position {position + 1} -
                Car: {transponderId} -
                Lap: {currentLap.current} -
                Last: {lastLapTime.current.toFixed(3)} -
                Total Time: {formattedTotalLapTime.current}
                </h3>
            </div>}
        </>
    )
}

export default RaceEntryDetails;
