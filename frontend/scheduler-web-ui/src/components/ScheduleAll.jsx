import { useState } from 'react'

import { Row, Col, ListGroup, Alert, Button } from 'react-bootstrap';
import { FaMagnifyingGlass } from "react-icons/fa6";

import { useEffect } from 'react';
import { getAll } from '../api/scheduleApi';

import BsModal from "../components/BsModal";


function ScheduleAll() {

    const [schedule, setSchedule] = useState([]);
    const [error, setError] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        getAll()
            .then(data => {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // nollställ tid eftersom dagen klocka tickar

                const filtered = data.filter(day => {
                    const d = new Date(day.date + "T00:00:00");
                    return d >= today;
                });

                filtered.forEach(day => {
                    day.blocks.sort((a, b) => {
                        const t1 = a.range.start;
                        const t2 = b.range.start;
                        return t1.localeCompare(t2);
                    });
                });

                setSchedule(filtered);
            })
            .catch(err => setError(err.message));
    }, []);

    const handleOpen = (id) => {
        setSelectedId(id);
        setShow(true);
    };

    const refreshData = async () => {
        try {
            const data = await getAll();
            setSchedule(data);
        } catch (err) {
            console.error("Kunde inte uppdatera listan:", err);
        }
    };


    const handleClose = () => setShow(false);

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
                        {/*<h1>Schemaöversikt</h1>*/}
                    </Col>

                    {!error && schedule.length === 0 && <p>Laddar eller tomt schema...</p>}
                </Row>
            
            
                <Row className="mt-2">
                    <Col className="col-12">
                        <ListGroup>
                            {schedule.map(day => (

                                day.blocks.map(block =>
                                (
                                    <ListGroup.Item key={block.id} className="list-group-item-action">
                                        <div>
                                            <small>Datum: {day.date} : Block ID:{block.id}</small>
                                            <div>
                                                {block.range.start.slice(0, 5)} - {block.range.end.slice(0, 5)} <span className="fw-bold"> - {block.title}</span> - Längd: {block.range.duration.slice(0, 5)}
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            {block.presenters?.length > 0 && (
                                                <div>
                                                    med <span className="fw-bold">{block.presenters.map(p => p.name).join(", ")} </span>
                                                    <span>
                                                        i Studio {block.studio}
                                                    </span>
                                                </div>
                                            )}
                                            {block.guests?.length > 0 && (
                                                <span className="mx-2"> Gäst/Gäster: {block.guests.map(g => g.name).join(", ")}</span>
                                            )}
                                            <Button className="btn btn-primary ms-auto" onClick={() => handleOpen(block.id)}><FaMagnifyingGlass/></Button>
                                        </div>
                                    </ListGroup.Item>
                                )
                                )))
                            }
                        </ListGroup>
                    </Col>
                </Row>
            <BsModal
                show={show}
                onHide={() => setShow(false)}
                id={selectedId}
                onDeleted={refreshData}
            />
        </>
    )
}

export default ScheduleAll
