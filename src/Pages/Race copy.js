import React, { useEffect, useState } from 'react';
import RaceDetailsPanel from '../components/raceDetailsPanel';
import RaceTimer from '../components/RaceTimer';
import StartRaceButton from '../components/startRaceButton';
import EndRaceButton from '../components/EndRaceButton';
import RaceId from '../components/RaceId';
import CountdownTimer from '../components/CountdownTimer';

const RaceScreen = () => {

    const [raceDetails, setRaceDetails] = useState({
        raceData: []
    });
    const { raceData: sortedRaceData } = raceDetails;
    const [raceStatus, setRaceStatus] = useState('notstarted');
    const [raceStatusBackend, setRaceStatusBackend] = useState('notstarted');
    const [fastestLap, setFastestLap] = useState({});
    const [raceID, setRaceID] = useState('000');

    const startRace = () => {
        setRaceStatus('countdown');
    }

    const startRaceAfterCountdown = () => {
        setRaceStatus('running');
    }

    const endRace = () => {
        setRaceStatus('notstarted');
    }

    const endRaceByTimer = () => {
        setRaceStatus('finishing');

        fetch('http://localhost:3001/liverace/endrace/', {
            method: 'post'
        })
    }

    const getRaceData = () => {

        return fetch('http://localhost:3001/liverace/racedata', {
            method: 'get'
        })
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    setRaceStatusBackend(data.raceStatusBackend);
                    if (raceStatusBackend !== 'complete') {
                        setRaceDetails(data);
                        setFastestLap(data.fastestLap);
                        setRaceID(data.raceID);
                    }
                })

            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    const generateFakeLap = () => {
        return fetch('http://localhost:3001/liverace/generatetestlap', {
            method: 'post'
        })
    }

    useEffect(() => {
        if (raceStatus === 'running' || raceStatus === 'finishing') {
            const intervalId = setInterval(() => {
                if (process.env.REACT_APP_ENV === 'development') generateFakeLap();
                getRaceData();
            }, 1000);
            return () => clearInterval(intervalId);

        }
    });

    useEffect(() => {
        if (raceStatusBackend === 'complete') setRaceStatus('complete')
    }, [raceStatusBackend]);

    return (
        <div style={{ width: "100%" }} >
            {raceStatus === 'running' && <RaceTimer
                initialMinute={'1'}
                raceStatus={raceStatus}
                triggerRaceEnd={endRaceByTimer}
            />}
            {raceStatus === 'countdown' && <CountdownTimer
                countdownSeconds={'5'}
                raceStatus={raceStatus}
                triggerRaceStart={startRaceAfterCountdown}
            />}
            {raceStatus === 'finishing' && <h1>Complete your final lap</h1>}
            {raceStatusBackend === 'complete' && <h1>Race Complete</h1>}
            {raceStatus === 'notstarted' && <h1>Waiting to start</h1>}
            <RaceId raceId={raceID} />
            <RaceDetailsPanel sortedRaceData={sortedRaceData} fastestLap={fastestLap} />
            <StartRaceButton raceInProgress={startRace} />
            <EndRaceButton raceInProgress={endRace} />
        </div>
    );
}

export default RaceScreen;