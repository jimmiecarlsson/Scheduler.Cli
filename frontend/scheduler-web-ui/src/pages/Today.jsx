
import React from 'react'
import { Row, Col, Container} from 'react-bootstrap';

import ScheduleToday from '../components/ScheduleToday';

const Today = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>Dagens sändningar</h1>
                        <ScheduleToday />
                    </Col>
                </Row>

            </Container>
            
        </>
    )
}

export default Today
