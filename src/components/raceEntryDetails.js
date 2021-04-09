import React, { useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import getRealName from '../helpers/TransponderLookup';

const RaceEntryDetails = ({ transponderId, filteredLaps = [], totalLapTime, position, gap }) => {

    let currentLap = useRef(0);
    let lastLapTime = useRef(0.000);
    let formattedTotalLapTime = useRef(0.000);

    useEffect(() => {
        if (filteredLaps.length) {
            currentLap.current = filteredLaps[filteredLaps.length - 1].lapNo;
            lastLapTime.current = filteredLaps[filteredLaps.length - 1].laptime;
        }
    }, [filteredLaps]);

    useEffect(() => {
        var minutes = Math.floor(totalLapTime / 60);
        var seconds = totalLapTime - minutes * 60;

        formattedTotalLapTime.current = minutes + 'm:' + seconds.toFixed(3) + 's';

    }, [totalLapTime]);


    return (
        <>
            { transponderId && <Row key={transponderId} >
                <Col > P{position + 1}</Col>
                <Col>{getRealName(transponderId)}</Col>
                <Col>{currentLap.current}</Col>
                <Col style={{ textAlign: "right" }} >{lastLapTime.current.toFixed(3)}</Col>
                <Col style={{ textAlign: "right" }} >{formattedTotalLapTime.current}</Col>
                <Col>(+{gap}) </Col>
            </Row>
            }
        </>
    )
}

export default RaceEntryDetails;
