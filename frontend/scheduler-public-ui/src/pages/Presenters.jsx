
import React from 'react'

import maddeImg from '../assets/madde.jpg'
import olleImg from '../assets/olle.jpg'
import bobImg from '../assets/bob.jpg'
import jonnaImg from '../assets/jonna.jpg'
import martinImg from '../assets/martin.jpg'

import { Container, Row, Col, Card } from 'react-bootstrap'

import Hero from "../components/layout/Hero"


const Presenters = () => {
    return (
        <>
            
            <Row id="rest" className="col-md-8 purple-rain">
                    <Col className="col-md-4">
                        <Card>
                            <Card.Img variant="top" src={maddeImg} />
                            <Card.Body>
                                <Card.Title>Madde</Card.Title>
                                <Card.Subtitle className="mb-2">Presenter</Card.Subtitle>
                                <Card.Text>
                                    madde@radiogaga.com
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-md-4">
                        <Card>
                            <Card.Img variant="top" src={olleImg} />
                            <Card.Body>
                                <Card.Title>Olle</Card.Title>
                                <Card.Subtitle className="mb-2">Presenter</Card.Subtitle>
                                <Card.Text>
                                    olle@radiogaga.com
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-md-4">
                        <Card>
                            <Card.Img variant="top" src={bobImg} />
                            <Card.Body>
                                <Card.Title>Bob</Card.Title>
                                <Card.Subtitle className="mb-2">Presenter</Card.Subtitle>
                                <Card.Text>
                                    bob@radiogaga.com
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-md-4">
                        <Card>
                            <Card.Img variant="top" src={jonnaImg} />
                            <Card.Body>
                                <Card.Title>Jonna</Card.Title>
                                <Card.Subtitle className="mb-2">Presenter</Card.Subtitle>
                                <Card.Text>
                                    jonna@radiogaga.com
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-md-4">
                        <Card>
                            <Card.Img variant="top" src={martinImg} />
                            <Card.Body>
                                <Card.Title>Martin</Card.Title>
                                <Card.Subtitle className="mb-2">Presenter</Card.Subtitle>
                                <Card.Text>
                                    martin@radiogaga.com
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
           
        </>
    )
}

export default Presenters
