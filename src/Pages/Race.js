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
    const { raceData: unsortedRaceData } = raceDetails;
    const [raceStatus, setRaceStatus] = useState('notstarted');
    const [raceStatusBackend, setRaceStatusBackend] = useState('notstarted');
    const [fastestLap, setFastestLap] = useState({});
    const [raceID, setRaceID] = useState('000');

    const startRace = (raceId) => {
        setRaceStatus('countdown');
        setRaceID(raceId);
    }

    const startRaceAfterCountdown = () => {

        setRaceStatus('running');

        fetch(`https://localhost:5001/races/${raceID}`, {
        method: 'put',
        body: JSON.stringify({ raceStatusBackEnd: 'running'})
    })
        .then(function (response) {
            if (response.status !== 204) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
    }

    const endRace = () => {
        setRaceStatus('notstarted');
    }

    const endRaceByTimer = () => {
        setRaceStatus('finishing');

        fetch(`https://localhost:5001/races/${raceID}`, {
            method: 'put',
            body: JSON.stringify({ raceStatusBackEnd: 'finishing'})
        })
            .then(function (response) {
                if (response.status !== 204) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    const getRaceData = () => {

        return fetch(`https://localhost:5001/races/${raceID}`, {
            method: 'get',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
            },
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
                        console.log('at fetch', data);
                        //setFastestLap(data.fastestLap);
                        // setRaceID(data.raceID);
                    }
                })

            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    useEffect(() => {
        if (raceStatus === 'running' || raceStatus === 'finishing') {
            const intervalId = setInterval(() => {
                // if (process.env.REACT_APP_ENV === 'development') generateFakeLap();
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
            <RaceDetailsPanel unsortedRaceData={unsortedRaceData} fastestLap={fastestLap} />
            <StartRaceButton raceInProgress={startRace} />
            <EndRaceButton raceInProgress={endRace} raceId={raceID} />
        </div>
    );
}

export default RaceScreen;