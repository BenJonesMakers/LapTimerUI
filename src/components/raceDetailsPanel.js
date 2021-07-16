import React, { useEffect, useState } from 'react';
import NewRaceLeader from './NewRaceLeader';
import RaceEntryDetails from './raceEntryDetails'
import { Container, Row, Col } from 'react-bootstrap';
import { getGap } from '../helpers/Utilities';
import FastestLap from './FastestLap';

const RaceDetailsPanel = (props) => {

    const [raceLeaderChanged, setRaceLeaderChanged] = useState(false);
    const [raceLeader, setRaceLeader] = useState('');

    console.log('prop', props.filteredAndSortedLaps);

    // useEffect(() => {
    //     if (props.filteredAndSortedLaps) {
    //         const possibleNewRaceLeader = props.filteredAndSortedLaps[0].transponderId;

    //         if (raceLeader !== possibleNewRaceLeader) {
    //             setRaceLeaderChanged(true);
    //             setRaceLeader(possibleNewRaceLeader);

    //         } else {
    //             setRaceLeaderChanged(false);
    //         }
    //     }
    // }, [props.filteredAndSortedLaps, raceLeader]);

    if (props.filteredAndSortedLaps === undefined) {
        return <p>No race data</p>
    }
    const racers = Object.keys(props.filteredAndSortedLaps).map((transponder, index) => {
        let laps = props.filteredAndSortedLaps[transponder].laps;
        let lapNumber = 0;
        let lastLap = 0;
        if (laps.length > 1) {
            lapNumber = laps[laps.length - 1].lapNo;
            lastLap = laps[laps.length - 1].laptime;
        }
        return (
            <RaceEntryDetails
                key={props.filteredAndSortedLaps[transponder].transponderId}
                transponderId={props.filteredAndSortedLaps[transponder].transponderId}
                currentLap={lapNumber}
                lastLapTime={lastLap}
                totalLapTime={props.filteredAndSortedLaps[transponder].totalTime}
                position={index}
                gap={getGap(index, props.filteredAndSortedLaps[transponder].totalTime, props.filteredAndSortedLaps)}
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
