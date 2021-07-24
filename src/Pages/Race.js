import React, { useEffect, useState } from 'react';
import RaceDetailsPanel from '../components/raceDetailsPanel';
import RaceTimer from '../components/RaceTimer';
import StartRaceButton from '../components/StartRaceButton';
import EndRaceButton from '../components/EndRaceButton';
import RaceId from '../components/RaceId';
import CountdownTimer from '../components/CountdownTimer';
import speech from 'speech-js';

const RaceScreen = (props) => {

    const [raceDetails, setRaceDetails] = useState({});
    const [raceStatus, setRaceStatus] = useState('notstarted');
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
        setTimeout(() => {
            speech.synthesis('Race complete', 'en-US');
            console.log(raceDetails);
            speech.synthesis('The winner with laps was ', 'en-US');
            setRaceStatus('complete');
            fetch('http://localhost:3000/liverace/endrace/', {
                method: 'post'
            })
        }, 10000);
    }

    // const handleOnClick = (e) => {
    //     e.preventDefault();
    //     props.toggleRaceStatus();
    //     if (raceStatus === 'notstarted' || raceStatus === 'countdown') {
    //         setRaceStatus('running');
    //     } else {
    //         setRaceStatus('notstarted');
    //     }
    // }

    const getRaceData = () => {

        return fetch('http://localhost:3000/liverace/racedata', {
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
                    setFastestLap(data.fastestLap);
                    setRaceID(data.raceID);
                })

            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    const generateFakeLap = () => {
        return fetch('http://localhost:3000/liverace/generatetestlap', {
            method: 'post'
        })
    }

    useEffect(() => {
        if (raceStatus === 'running' || raceStatus === 'finishing') {
            const intervalId = setInterval(() => {
                generateFakeLap();
                getRaceData();
            }, 1000);
            return () => clearInterval(intervalId);

        }
    });

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
            {raceStatus === 'complete' && <h1>Race Complete</h1>}
            {raceStatus === 'notstarted' && <h1>Waiting to start</h1>}
            <RaceId raceId={raceID} />
            <RaceDetailsPanel unsortedRaceData={raceDetails.raceData} fastestLap={fastestLap} />
            <StartRaceButton raceInProgress={startRace} />
            <EndRaceButton raceInProgress={endRace} />
            {/* <button onClick={handleOnClick}>toggle fake running</button> */}
        </div>
    );
}

export default RaceScreen;