import ScheduleAll from '../components/ScheduleAll';
import ScheduleToday from '../components/ScheduleToday';

import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';

export default function All() {
    return (
        <>
            <Container>
                <Row className="mb-5">
                    <Col>
                        <h1>Dagens sändningar</h1>
                        <ScheduleToday />
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col>
                        <h1>Alla kommande sändningar</h1>
                        <ScheduleAll />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
