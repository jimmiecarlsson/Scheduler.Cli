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
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        getAll()
            .then(data => {
                const sorted = data.sort((a, b) =>
                    new Date(a.date) - new Date(b.date)
                );

                sorted.forEach(day => {
                    day.blocks.sort((a, b) => a.range.start.localeCompare(b.range.start));
                });

                setSchedule(sorted);

                const todayStr = new Date().toISOString().split("T")[0];
                const index = sorted.findIndex(d => d.date === todayStr);


                setCurrentIndex(index >= 0 ? index : 0);

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

const prev = () => {
    if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
    }
};

const next = () => {
    if (currentIndex < schedule.length - 1) {
        setCurrentIndex(currentIndex + 1);
    }
};

const currentDay = schedule[currentIndex];

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
                    {schedule.length > 0 && currentDay?.blocks.length > 0 ? (

                        currentDay.blocks.map(block =>
                        (
                            <ListGroup.Item key={block.id} className="list-group-item-action">

                                <div>
                                    <small>Datum: {currentDay.date} : Block ID:{block.id}</small>
                                    <div>
                                        {block.range.start.slice(0, 5)} - {block.range.end.slice(0, 5)}
                                        <span className="fw-bold"> - {block.title}</span> - Längd: {block.range.duration.slice(0, 5)}
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

                                    <Button className="btn btn-primary ms-auto" onClick={() => handleOpen(block.id)}>
                                        <FaMagnifyingGlass />
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        )
                        )) : (
                    <ListGroup.Item>
                        <em> Inga block denna dag.</em>
                    </ListGroup.Item>
                    )
                    }
                </ListGroup>
                <div className="d-flex justify-content-between mt-3">
                    <Button
                        variant="secondary"
                        disabled={currentIndex === 0}
                        onClick={prev}
                    >
                        Föregående dag
                    </Button>

                    <div>
                        {currentDay?.date}
                    </div>

                    <Button
                        variant="secondary"
                        disabled={currentIndex === schedule.length - 1}
                        onClick={next}
                    >
                        Nästa dag
                    </Button>
                </div>
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
