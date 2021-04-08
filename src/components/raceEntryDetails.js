import React, { useEffect, useRef } from 'react';

const RaceEntryDetails = ({ transponderId, filteredLaps = [], totalLapTime, position }) => {

    let currentLap = useRef(0);
    let lastLapTime = useRef(0.000);
    let formattedTotalLapTime = useRef(0.000);
    let randomColor = useRef(0);

    // useEffect(() => {
    //     randomColor.current = Math.floor(Math.random() * 255);
    // }, []);

    useEffect(() => {
        if (filteredLaps.length) {
            currentLap.current = filteredLaps[filteredLaps.length - 1].lapNo;
            lastLapTime.current = filteredLaps[filteredLaps.length - 1].laptime;
        }
    }, [filteredLaps.length, filteredLaps]);

    useEffect(() => {
        var minutes = Math.floor(totalLapTime / 60);
        var seconds = totalLapTime - minutes * 60;

        formattedTotalLapTime.current = minutes + 'm:' + seconds.toFixed(3) + 's';

    }, [totalLapTime]);


    return (
        <>
            {transponderId && <div key={transponderId}>
                <h5 style={{ color: 'rgb(0,' + randomColor.current + ',0)' }}>Position {position + 1} -
                Car: {transponderId} -
                Lap: {currentLap.current} -
                Last: {lastLapTime.current.toFixed(3)} -
                Total Time: {formattedTotalLapTime.current}
                </h5>
            </div>}
        </>
    )
}

export default RaceEntryDetails;
