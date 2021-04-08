import React, { useEffect, useState } from 'react';
import RaceDetailsPanel from './raceDetailsPanel';
import RaceTimer from './RaceTimer';
import StartRaceButton from './startRaceButton';
import StopListeningButton from './stopListeningButton';



const RaceScreen = () => {

    const uniqueTransponders = ["1006319", "1003456", "1003666"];
    const [laps, setLaps] = useState([]);
    const [raceStatus, setRaceStatus] = useState('notstarted');
    const [lapNumber, setLapNumber] = useState(1);

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

    const generateRandomNumber = (max, min) => {
        return Math.random() * (max - min) + min;
    }

    // const runCounter = () => {
    //     if (raceStatus === 'running') {
    //         let myInterval = setInterval(() => {
    //             if (seconds > 0) {
    //                 setSeconds(seconds - 1);
    //             }
    //             if (seconds === 0) {
    //                 if (minutes === 0) {
    //                     clearInterval(myInterval)
    //                 } else {
    //                     setMinutes(minutes - 1);
    //                     setSeconds(59);
    //                 }
    //             }
    //         }, 1000)
    //         return () => {
    //             clearInterval(myInterval);
    //         };
    //     }
    // };

    // async getRaceData() {
    //     let self = this;

    //     if (raceStatus === 'running') {
    //         console.log('I ran');
    //         await fetch('http://localhost:3000/liverace/', {
    //             method: 'get'
    //         })
    //             .then(function (response) {
    //                 if (response.status !== 200) {
    //                     console.log('Looks like there was a problem. Status Code: ' +
    //                         response.status);
    //                     return;
    //                 }

    //                 response.json().then(function (data) {
    //                     self.setState({ laps: data.laps });
    //                     self.setState({ uniqueTransponders: data.uniqueTransponders });
    //                     console.log('lap data:', data.laps);
    //                 })

    //             })
    //             .catch(function (err) {
    //                 console.log('Fetch Error :-S', err);
    //             })
    //     }
    // }

    const getFakeRaceData = () => {
        console.log('I\'m sending fake race data');
        var tempLaps = laps;

        uniqueTransponders.forEach(transponder => {

            let fakeLap = {
                transponderId: transponder,
                lapNo: lapNumber,
                laptime: generateRandomNumber(7.000, 18.000)
            }

            tempLaps.push(fakeLap);
        });

        var newLapNumber = lapNumber + 1;
        setLapNumber(newLapNumber);
        return tempLaps;
    }

    useEffect(() => {
        if (raceStatus === 'running') {
            const intervalId = setInterval(() => {
                setLaps(getFakeRaceData());
            }, 5000);

            return () => clearInterval(intervalId);
        }
    });

    return (
        <div>
            <RaceTimer initialMinute={'10'} raceStatus={raceStatus} />
            <RaceDetailsPanel laps={laps} uniqueTransponders={uniqueTransponders} />
            <StartRaceButton raceInProgress={startRace} />
            <StopListeningButton />
            <button onClick={handleOnClick}>toggle fake running</button>
        </div>
    );
}

export default RaceScreen;