import React, { useEffect, useState, useMemo } from 'react';
import NewRaceLeader from './NewRaceLeader';
import RaceEntryDetails from './raceEntryDetails'
import { Container, Row, Col } from 'react-bootstrap';
import { getGap } from '../helpers/Utilities';
import FastestLap from './FastestLap';

const RaceDetailsPanel = (props) => {

    const [raceLeaderChanged, setRaceLeaderChanged] = useState(false);
    const [raceLeader, setRaceLeader] = useState('');
    const { unsortedRaceData } = props;
    let sortedRaceData = useMemo(() => {
        if (unsortedRaceData && unsortedRaceData.length) {
            return unsortedRaceData
                .sort((a, b) => {
                    // Sorts first by number of laps and then by shortest time
                    var n = b.totalLaps - a.totalLaps;
                    if (n !== 0) {
                        return n;
                    }
                    return a.totalTime - b.totalTime;
                });
        }
    }, [unsortedRaceData]);

    useEffect(() => {
        if (sortedRaceData && sortedRaceData.length > 0) {
            const possibleNewRaceLeader = sortedRaceData[0].transponderId;

            if (raceLeader !== possibleNewRaceLeader) {
                setRaceLeaderChanged(true);
                setRaceLeader(possibleNewRaceLeader);
                console.log('Race Leader now: ', possibleNewRaceLeader);
            } else {
                setRaceLeaderChanged(false);
            }
        }
    }, [sortedRaceData, raceLeader]);

    //rendering

    if (!sortedRaceData) {
        return <p>No race data</p>
    }

    const racers = sortedRaceData.map((transponder, index) => {
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
                gap={getGap(index, transponder.totalTime, sortedRaceData)}
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
