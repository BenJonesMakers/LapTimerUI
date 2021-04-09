import React, { useEffect, useRef, useState } from 'react';
import NewRaceLeader from './NewRaceLeader';
import RaceEntryDetails from './raceEntryDetails'
import { Container, Row, Col } from 'react-bootstrap';

const RaceDetailsPanel = ({ laps = [], uniqueTransponders }) => {

    const filteredAndSortedLaps = useRef([]);
    // object in array is:
    // {
    //   transponderId: 'string',
    //   filteredLaps: [],
    //   totalLapTime: float
    // }
    const [raceLeaderChanged, setRaceLeaderChanged] = useState(false);

    useEffect(() => {

        let oldFSL = filteredAndSortedLaps.current || [];
        filteredAndSortedLaps.current = [];

        const filteredLaps = (transponder) => {
            return laps.filter(lap => lap.transponderId === transponder);
        }

        const totalLapTime = (transponder) => {
            var totalLapTimeByTransponder = filteredLaps(transponder).reduce(function (prev, current) {
                return prev + current.laptime
            }, 0);

            return totalLapTimeByTransponder.toFixed(3);
        }

        if (laps.length) {
            uniqueTransponders.forEach(transponderId => {
                filteredAndSortedLaps.current.push(
                    {
                        transponderId: transponderId,
                        filteredLaps: filteredLaps(transponderId),
                        totalLapTime: totalLapTime(transponderId)
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

    const getGap = (index, nextTotalLapTime) => {
        if (index < 1) {
            return '---';
        }
        const gap = nextTotalLapTime - filteredAndSortedLaps.current[index - 1].totalLapTime;
        return gap.toFixed(3);
    }

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
                        filteredLaps={transponder.filteredLaps}
                        totalLapTime={transponder.totalLapTime}
                        position={index}
                        gap={getGap(index, transponder.totalLapTime)}
                    />
                )) : <p>Race not running</p>
            }
        </Container>
    )

}

export default RaceDetailsPanel;
