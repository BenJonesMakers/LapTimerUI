import React, { useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import getRealName from '../helpers/TransponderLookup';

const RaceEntryDetails = ({ transponderId, currentLap, lastLapTime, totalLapTime, averageLapTime, position, gap }) => {

    let formattedTotalLapTime = useRef(0.000);

    useEffect(() => {
        var minutes = Math.floor(totalLapTime / 60);
        var seconds = totalLapTime - minutes * 60;

        if (seconds < 10) {
            seconds = '0' + seconds.toFixed(3);
        }
        else {
            seconds = seconds.toFixed(3);
        }

        formattedTotalLapTime.current = minutes + 'm ' + seconds + 's';

    }, [totalLapTime]);


    return (
        <>
            {transponderId && <Row key={transponderId} >
                <Col > P{position + 1}</Col>
                <Col>{getRealName(transponderId)}</Col>
                <Col>{currentLap}</Col>
                <Col style={{ textAlign: "right" }} >{lastLapTime.toFixed(3)}</Col>
                <Col style={{ textAlign: "right" }} >{formattedTotalLapTime.current}</Col>
                <Col style={{ textAlign: "right" }} >{averageLapTime ? averageLapTime.toFixed(3) : '---'}</Col>
                <Col>{gap} </Col>
            </Row>
            }
        </>
    )
}

export default RaceEntryDetails;
