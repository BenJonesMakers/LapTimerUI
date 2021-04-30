import React, { useEffect, useState } from 'react';
import NewRaceLeader from './NewRaceLeader';
import RaceEntryDetails from './raceEntryDetails'
import { Container, Row, Col } from 'react-bootstrap';
import { getGap } from '../helpers/Utilities';
import FastestLap from './FastestLap';

const RaceDetailsPanel = ({ filteredAndSortedLaps = [], fastestLap }) => {

    const [raceLeaderChanged, setRaceLeaderChanged] = useState(false);
    const [raceLeader, setRaceLeader] = useState('');

    useEffect(() => {

        if (filteredAndSortedLaps.length) {
            const possibleNewRaceLeader = filteredAndSortedLaps[0].transponderId;

            if (raceLeader !== possibleNewRaceLeader) {

                setRaceLeaderChanged(true);
                setRaceLeader(possibleNewRaceLeader);

            } else {
                setRaceLeaderChanged(false);
            }
        }

    }, [filteredAndSortedLaps, filteredAndSortedLaps.length, raceLeader]);

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
            {filteredAndSortedLaps.length > 0 ?
                filteredAndSortedLaps.map((transponder, index) => (
                    <RaceEntryDetails
                        key={transponder.transponderId}
                        transponderId={transponder.transponderId}
                        currentLap={transponder.filteredLaps[transponder.filteredLaps.length - 1].lapNo}
                        lastLapTime={transponder.filteredLaps[transponder.filteredLaps.length - 1].laptime}
                        totalLapTime={transponder.totalLapTime}
                        position={index}
                        gap={getGap(index, transponder.totalLapTime, filteredAndSortedLaps)}
                    />
                )) : <p>Race not running</p>
            }

            <FastestLap fastestLap={fastestLap} />
            {raceLeaderChanged && <NewRaceLeader newLeader={raceLeader} />}
        </Container>
    )

}

export default RaceDetailsPanel;
