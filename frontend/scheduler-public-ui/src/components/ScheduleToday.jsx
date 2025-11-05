import { getToday } from '../api/scheduleApi';
import { useState } from 'react'
import { useEffect } from 'react';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ScheduleToday = ({ onLoaded, showList = true }) => {

    const [schedule, setSchedule] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            getToday()
                .then(data => {
                    setSchedule(data);
                    if (onLoaded) onLoaded(data);
                })
                .catch(err => setError(err.message));
        };
        fetchData();
        const intervalId = setInterval(fetchData, 60000);

        return () => clearInterval(intervalId);
    }, []);

    if (!showList) return null;

    return (
        <>
            {typeof error === "string" && error.trim() !== "" && (

                <Row>
                    <Col className="col-12">
                        <Alert variant="danger" dismissible>
                            <Alert.Heading>Fel:</Alert.Heading>
                            <p>{error}</p>
                        </Alert>
                    </Col>
                </Row>

            )}
            <div>ScheduleToday komponent</div>
        
        </>
    )
}

export default ScheduleToday

