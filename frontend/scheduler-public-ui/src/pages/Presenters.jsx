
import React from 'react'
import Card from 'react-bootstrap/Card'
import maddeImg from '../assets/madde.jpg';
import olleImg from '../assets/olle.jpg';
import bobImg from '../assets/bob.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Presenters = () => {
    return (
        <>
            <section className="purple-rain p-5">
                <h1 className="display-1">Presenters</h1>
                <p className="lead fw-bold">
                    Our mission is loud and clear — we’re here to rock around the clock.
                </p>
            </section>
            <Container>
                <Row>
                    <Col className="col-md-4">
                        <Card>
                            <Card.Img variant="top" src={maddeImg} />
                            <Card.Body>
                                <Card.Title>Madde</Card.Title>
                                <Card.Subtitle className="mb-2">Card Subtitle</Card.Subtitle>
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
                                <Card.Title>Card Title</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-md-4">
                        <Card>
                            <Card.Img variant="top" src={bobImg} />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Presenters
