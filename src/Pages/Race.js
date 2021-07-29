import React, { useEffect, useState } from 'react';
import RaceDetailsPanel from '../components/raceDetailsPanel';
import RaceTimer from '../components/RaceTimer';
import StartRaceButton from '../components/StartRaceButton';
import EndRaceButton from '../components/EndRaceButton';
import RaceId from '../components/RaceId';
import CountdownTimer from '../components/CountdownTimer';
import speech from 'speech-js';

const RaceScreen = () => {

    const [raceDetails, setRaceDetails] = useState({
        raceData: []
    });
    const { raceData: sortedRaceData } = raceDetails;
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
        // get the current race leader and their transponder.
        const winingTransponder = sortedRaceData[0].transponderId;
        const winingRealName = sortedRaceData[0].realName;
        const winingNumberOfLaps = sortedRaceData[0].totalLaps;
        console.log(`The winner (${winingTransponder}) is ${winingRealName} with ${winingNumberOfLaps} laps`);
        speech.synthesis(`The winner (${winingTransponder}) is ${winingRealName} with ${winingNumberOfLaps} laps`, 'en-US');
        console.log(raceDetails);
        fetch('http://localhost:3000/liverace/endrace/', {
            method: 'post'
        })

        // real race finish being calculated in the back-end - this is just a UI clean up
        setTimeout(() => {
            speech.synthesis('Race complete', 'en-US');
            setRaceStatus('complete');
        }, 10000);
    }

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
            <RaceDetailsPanel sortedRaceData={sortedRaceData} fastestLap={fastestLap} />
            <StartRaceButton raceInProgress={startRace} />
            <EndRaceButton raceInProgress={endRace} />
        </div>
    );
}

export default RaceScreen;