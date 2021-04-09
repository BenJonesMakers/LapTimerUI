import React, { useEffect, useState, useRef } from 'react';
import { getFakeRaceDataSingleTransponder } from '../helpers/RaceData';
import RaceDetailsPanel from './raceDetailsPanel';
import RaceTimer from './RaceTimer';
import StartRaceButton from './startRaceButton';
import StopListeningButton from './stopListeningButton';

const RaceScreen = () => {

    const exampleTransponders = ["1006319", "1003456", "1003666"];
    const [transpondersAndLaps, setTranspondersAndLaps] = useState({
        '1006319': 0,
        '1003456': 0,
        '1003666': 0
    })
    const [laps, setLaps] = useState([]);
    const [raceStatus, setRaceStatus] = useState('notstarted');
    let uniqueTransponders = useRef([]);

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
                var randomTransponder = exampleTransponders[Math.floor(Math.random() * exampleTransponders.length)];
                var currentLap = transpondersAndLaps[randomTransponder];
                const fakeLap = getFakeRaceDataSingleTransponder(randomTransponder, currentLap);

                setLaps(laps => [...laps, ...fakeLap]);
                setTranspondersAndLaps(prevState => {
                    let updatedObject = Object.assign({ ...prevState }, prevState.updatedObject);
                    updatedObject[randomTransponder] = currentLap + 1;
                    return updatedObject;
                })
                console.log(transpondersAndLaps);
                uniqueTransponders.current = [...new Set(laps.map(item => item.transponderId))];

            }, 1000);

            return () => clearInterval(intervalId);
        }
    });

    return (
        <div style={{ width: "100%" }} >
            <RaceTimer initialMinute={'10'} raceStatus={raceStatus} />
            <RaceDetailsPanel laps={laps} uniqueTransponders={uniqueTransponders.current} />
            <StartRaceButton raceInProgress={startRace} />
            <StopListeningButton />
            <button onClick={handleOnClick}>toggle fake running</button>
        </div>
    );
}

export default RaceScreen;