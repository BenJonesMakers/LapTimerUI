import React, { useEffect, useRef, useState } from 'react';
import NewRaceLeader from './NewRaceLeader';
import RaceEntryDetails from './raceEntryDetails'
import { Container, Row, Col } from 'react-bootstrap';
import { getGap, filteredLaps, totalLapTime } from '../helpers/Utilities';

const RaceDetailsPanel = ({ laps = [], uniqueTransponders }) => {

    const filteredAndSortedLaps = useRef([]);
    const [raceLeaderChanged, setRaceLeaderChanged] = useState(false);

    useEffect(() => {
        console.log('Panel has new lap data: ', laps);

        let oldFSL = filteredAndSortedLaps.current || [];
        filteredAndSortedLaps.current = [];

        if (laps.length) {
            uniqueTransponders.forEach(transponderId => {
                filteredAndSortedLaps.current.push(
                    {
                        transponderId: transponderId,
                        filteredLaps: filteredLaps(transponderId, laps),
                        totalLapTime: totalLapTime(filteredLaps(transponderId, laps))
                    }
                );

            });

            filteredAndSortedLaps.current = filteredAndSortedLaps.current.sort((a, b) => a.totalLapTime - b.totalLapTime);

            // check if position has changed
            setRaceLeaderChanged(false);

            if (oldFSL.length) {
                var oldLeader = oldFSL[0].transponderId;
                var newLeader = filteredAndSortedLaps.current[0].transponderId;
                if (oldLeader !== newLeader) {
                    setRaceLeaderChanged(true);
                }
            }
        }

    }, [laps.length, laps, uniqueTransponders.length, uniqueTransponders]);

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
            {filteredAndSortedLaps.current.length > 0 ?
                filteredAndSortedLaps.current.map((transponder, index) => (
                    <RaceEntryDetails
                        key={transponder.transponderId}
                        transponderId={transponder.transponderId}
                        currentLap={transponder.filteredLaps[transponder.filteredLaps.length - 1].lapNo}
                        lastLapTime={transponder.filteredLaps[transponder.filteredLaps.length - 1].laptime}
                        totalLapTime={transponder.totalLapTime}
                        position={index}
                        gap={getGap(index, transponder.totalLapTime, filteredAndSortedLaps.current)}
                    />
                )) : <p>Race not running</p>
            }
        </Container>
    )

}

export default RaceDetailsPanel;
