
import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ScheduleToday from '../components/ScheduleToday';

const Today = () => {
    return (
        <>
            <Row>
                <h1>Dagens sändningar</h1>
                <ScheduleToday />
            </Row>
            
        </>
    )
}

export default Today
