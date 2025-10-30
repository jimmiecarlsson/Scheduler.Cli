import { useState } from 'react'
import './App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

import { useEffect } from 'react';
import { getAll } from './api/scheduleApi';


function App() {

    const [schedule, setSchedule] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        getAll()
            .then(data => setSchedule(data))
            .catch(err => setError(err.message));
    })

  return (
      <>
          <Container className="container-fluid d-flex justify-content-center align-items-center mt-5">
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
                      <h1>Schemaöversikt</h1>
                  </Col>
                  
                  {!error && schedule.length === 0 && <p>Laddar eller tomt schema...</p>}
              </Row>
          </Container>
          <Container className="container-fluid d-flex justify-content-center align-items-center mt-5">
              <Row className="mt-2">
                  <Col className="col-12">
                      <ListGroup>
                          {schedule.map(day => (
                              
                                  day.blocks.map(block =>
                                  (
                                      <ListGroup.Item key={block.id} className="list-group-item-action">
                                          <div>
                                              <small>Datum: {day.date}</small>
                                              <div>
                                                  {block.range.start.slice(0, 5)} - {block.range.end.slice(0, 5)} <span className="fw-bold"> - {block.title}</span> - Längd: {block.range.duration.slice(0,5)}
                                              </div>
                                          </div>
                                          <div>
                                              {block.presenters?.length > 0 && (
                                                  <div>
                                                      med <span className="fw-bold">{block.presenters.map(p => p.name).join(", ")} </span> 
                                                      <span>
                                                       i Studio {block.studio}
                                                      </span>
                                                  </div>
                                              )}
                                          </div>
                                          <div>
                                            {day.duration}
                                          </div>
                                      </ListGroup.Item>
                                  )
                                  )))
                              }
                      </ListGroup>
                  </Col>                  
              </Row>
          </Container>
    </>
  )
}

export default App
