import React, { useEffect, useState, useMemo } from 'react';
import NewRaceLeader from './NewRaceLeader';
import RaceEntryDetails from './raceEntryDetails'
import { Container, Row, Col } from 'react-bootstrap';
import { getGap } from '../helpers/Utilities';
import FastestLap from './FastestLap';

const RaceDetailsPanel = (props) => {

    const [raceLeaderChanged, setRaceLeaderChanged] = useState(false);
    const [raceLeader, setRaceLeader] = useState('');
    let sortedRacers = [];


    useEffect(() => {
        if (sortedRacers.length) {
            const possibleNewRaceLeader = sortedRacers[0].transponderId;

            if (raceLeader !== possibleNewRaceLeader) {
                setRaceLeaderChanged(true);
                setRaceLeader(possibleNewRaceLeader);
                console.log('Race Leader now: ', possibleNewRaceLeader);
            } else {
                setRaceLeaderChanged(false);
            }
        }
    }, [sortedRacers, raceLeader]);

    if (props.filteredAndSortedLaps === undefined) {
        return <p>No race data</p>
    } else {
        // create a new array of objects then create a new sorted array of objects
        const unsortedRacers = [];
        Object.keys(props.filteredAndSortedLaps).forEach((transponder) => {
            unsortedRacers.push(props.filteredAndSortedLaps[transponder]);
        });

        if (unsortedRacers.length) {
            sortedRacers = unsortedRacers
                .sort((a, b) => {
                    return b.totalTime - a.totalTime;
                });
        }
    }
    if (sortedRacers.length < 1) {
        return <p>No race data</p>
    }

    const racers = sortedRacers.map((transponder, index) => {
        let laps = transponder.laps;
        let lapNumber = 0;
        let lastLap = 0;
        if (laps.length > 1) {
            lapNumber = laps[laps.length - 1].lapNo;
            lastLap = laps[laps.length - 1].laptime;
        }
        return (
            <RaceEntryDetails
                key={transponder.transponderId}
                transponderId={transponder.transponderId}
                currentLap={lapNumber}
                lastLapTime={lastLap}
                totalLapTime={transponder.totalTime}
                position={index}
                gap={getGap(index, transponder.totalTime, sortedRacers)}
            />
        );
    }
    );
    return (
        <Container fluid style={{ height: 450 }} >
            <Row>
                <Col>Position</Col>
                <Col>Name</Col>
                <Col>Lap</Col>
                <Col>Last</Col>
                <Col>Total</Col>
                <Col>Gap</Col>
            </Row>
            {racers}
            <FastestLap fastestLap={props.fastestLap} />
            {raceLeaderChanged && <NewRaceLeader newLeader={raceLeader} />}
        </Container >
    )
}

export default RaceDetailsPanel;
