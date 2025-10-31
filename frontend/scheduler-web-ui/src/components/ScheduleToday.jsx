import { useState } from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import { useEffect } from 'react';
import { getToday } from '../api/scheduleApi';

const ScheduleToday = ({ onLoaded, showList=true}) => {

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

            <Row>
                <Col className="col-12">
                    {/*<h1>Idag</h1>*/}
                </Col>

                {!error && schedule.length === 0 && <p>Laddar eller tomt schema...</p>}
            </Row>


            <Row className="mt-2">
                <Col className="col-12">
                    <ListGroup>
                        {schedule.map((item) => (
                                <ListGroup.Item key={item.id} className="list-group-item-action">
                                    <div>
                                        <small>Datum: {item.date}</small>
                                        <div>
                                            {item.startTime.slice(0, 5)} - {item.endTime.slice(0, 5)} <span className="fw-bold"> - {item.title}</span>
                                        </div>
                                    </div>
                                    <div>
                                        {item.presenters?.length > 0 && (
                                            <div>
                                                med <span className="fw-bold">{item.presenters.map(p => p.name).join(", ")} </span>
                                                <span>
                                                    i Studio {item.studio.slice(6,7)}
                                                </span>
                                            </div>
                                        )}
                                        {item.guests?.length > 0 && (
                                            <div>Gäst: {item.guests.map(g => g.name).join(", ")}</div>
                                        )}
                                    </div>
                                 
                                </ListGroup.Item>
                            )
                            )
                        }
                    </ListGroup>
                </Col>
            </Row>

        </>
    )
}

export default ScheduleToday
