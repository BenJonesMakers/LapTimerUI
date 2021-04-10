import React, { useEffect, useState } from 'react';
import RaceDetailsPanel from './raceDetailsPanel';
import RaceTimer from './RaceTimer';
import StartRaceButton from './startRaceButton';
import StopListeningButton from './stopListeningButton';

const RaceScreen = () => {

    const [raceDetails, setRaceDetails] = useState({});
    const [raceStatus, setRaceStatus] = useState('notstarted');

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

    const getFakeAPIRaceData = () => {

        return fetch('http://localhost:3000/liverace/testrace', {
            method: 'get'
        })
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    setRaceDetails(data);
                })

            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    useEffect(() => {
        if (raceStatus === 'running') {

            const intervalId = setInterval(() => {
                getFakeAPIRaceData();
            }, 1000);
            return () => clearInterval(intervalId);
        }

    });

    return (
        <div style={{ width: "100%" }} >
            <RaceTimer initialMinute={'10'} raceStatus={raceStatus} />
            <RaceDetailsPanel filteredAndSortedLaps={raceDetails.raceData} />
            <StartRaceButton raceInProgress={startRace} />
            <StopListeningButton />
            <button onClick={handleOnClick}>toggle fake running</button>
        </div>
    );
}

export default RaceScreen;