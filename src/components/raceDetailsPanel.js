import React, { useEffect, useRef, useState } from 'react';
import NewRaceLeader from './NewRaceLeader';
import RaceEntryDetails from './raceEntryDetails'
import { Container, Row, Col } from 'react-bootstrap';
import { getGap } from '../helpers/Utilities';

const RaceDetailsPanel = ({ filteredAndSortedLaps = [] }) => {

    const [raceLeaderChanged, setRaceLeaderChanged] = useState(false);

    useEffect(() => {

        let oldFSL = filteredAndSortedLaps || [];

        if (filteredAndSortedLaps.length) {

            setRaceLeaderChanged(false);

            if (oldFSL.length) {
                var oldLeader = oldFSL[0].transponderId;
                var newLeader = filteredAndSortedLaps[0].transponderId;
                if (oldLeader !== newLeader) {
                    setRaceLeaderChanged(true);
                }
            }
        }

    }, [filteredAndSortedLaps, filteredAndSortedLaps.length]);

    return (
        <Container fluid>
            {raceLeaderChanged && <NewRaceLeader />}
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
        </Container>
    )

}

export default RaceDetailsPanel;
