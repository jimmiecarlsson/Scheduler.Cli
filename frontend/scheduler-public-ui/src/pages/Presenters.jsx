
import React from 'react'

import maddeImg from '../assets/madde.jpg'
import olleImg from '../assets/olle.jpg'
import bobImg from '../assets/bob.jpg'

import { Container, Row, Col, Card } from 'react-bootstrap'

import Hero from "../components/layout/Hero"


const Presenters = () => {
    return (
        <>
            <Hero
                title="Presenters"
                subtitle="Our mission is loud and clear — we’re here to rock around the clock."
                ctaText="This is who we are!"
                ctaHref="/presenters#rest"
            />
            <main className="cover-container">
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
                </Row>
            </main>
        </>
    )
}

export default Presenters
