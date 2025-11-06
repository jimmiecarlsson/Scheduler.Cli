import { getToday } from '../api/scheduleApi';
import { useState } from 'react'
import { useEffect } from 'react';
import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

import maddeImg from '../assets/madde.jpg';
import olleImg from '../assets/olle.jpg';
import bobImg from '../assets/bob.jpg';
import liveImg from '../assets/live.jpg';

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

    const presImages = {
        "Madde": maddeImg,
        "Olle": olleImg,
        "Bob": bobImg,
    };

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
            <Row className="mt-2 d-flex justify-content-center">
                <Col className="col-8">
                    <Card className="purple-rain">
                        {schedule.map((item) => (
                            <Card.Body key={item.id} className="purple-rain text-white mb-5">
                                <Row>
                                    <Col>
                                        <Col>
                                            {item.presenters?.length > 0 ? (
                                                <Card.Img
                                                    src={
                                                        presImages[item.presenters[0].name] || { liveImg }
                                                    }
                                                    alt={item.presenters[0].name}
                                                    onError={(e) => (e.target.src = { liveImg })}
                                                />
                                            ) : (
                                                <Card.Img src={liveImg} alt="Okänd presentatör" />
                                            )}
                                        </Col>
                                    </Col>
                                    <Col>
                                        <div>
                                            <h3>
                                                <span className="fw-bold">{item.title} </span>
                                            <span>
                                                {item.startTime.slice(0, 5)}
                                            </span>
                                            </h3>
                                        </div>
                                        <div>
                                            {item.presenters?.length > 0 && (
                                                <p>
                                                    med <span className="fw-bold">{item.presenters.map(p => p.name).join(", ")} </span>
                                                    <span>
                                                        i Studio {item.studio.slice(6, 7)}
                                                    </span>
                                                </p>
                                            )}
                                            {item.guests?.length > 0 && (
                                                <div>Gäst/gäster: {item.guests.map(g => g.name).join(", ")}</div>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        )
                        )
                        }
                    </Card>
                </Col>
            </Row>
        
        </>
    )
}

export default ScheduleToday

