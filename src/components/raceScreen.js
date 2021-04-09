import React, { useEffect, useState, useRef } from 'react';
import { getFakeRaceData } from '../helpers/RaceData';
import RaceDetailsPanel from './raceDetailsPanel';
import RaceTimer from './RaceTimer';
import StartRaceButton from './startRaceButton';
import StopListeningButton from './stopListeningButton';

const RaceScreen = () => {

    const uniqueTransponders = ["1006319", "1003456", "1003666"];
    const [laps, setLaps] = useState([]);
    const [raceStatus, setRaceStatus] = useState('notstarted');
    let lapNumber = useRef(1);

    const startRace = () => {
        setRaceStatus('running');
        console.log('raceStatus', raceStatus);
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        if (raceStatus === 'notstarted') {
            setRaceStatus('running');
        } else {
            setRaceStatus('notstarted');
        }
    }

    useEffect(() => {
        if (raceStatus === 'running') {
            const intervalId = setInterval(() => {
                const fakeLap = getFakeRaceData(uniqueTransponders, lapNumber.current);
                setLaps(laps => [...laps, ...fakeLap]);
                lapNumber.current = lapNumber.current += 1;
            }, 5000);

            return () => clearInterval(intervalId);
        }
    });

    return (
        <div style={{ width: "100%" }} >
            <RaceTimer initialMinute={'10'} raceStatus={raceStatus} />
            <RaceDetailsPanel laps={laps} uniqueTransponders={uniqueTransponders} />
            <StartRaceButton raceInProgress={startRace} />
            <StopListeningButton />
            <button onClick={handleOnClick}>toggle fake running</button>
        </div>
    );
}

export default RaceScreen;