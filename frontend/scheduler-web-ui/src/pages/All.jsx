import ScheduleAll from '../components/ScheduleAll';
import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function All() {
    return (
        <>
            <Row className="mb-5">
                <Col>
                    <ScheduleAll />
                </Col>
            </Row>
        </>
    )
}
