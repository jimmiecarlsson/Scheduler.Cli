import ScheduleAll from '../components/ScheduleAll';
import React from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ScheduleToday from '../components/ScheduleToday';



export default function Home() {
    return (
        <>
            <Row>
                <h1>Dagens sändningar</h1>
                <ScheduleToday />
            </Row>
        </>
    )
}
