import React from "react";
import { Card, Button, Row, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ScheduleOpenBlocks from "../components/ScheduleOpenBlocks";

const MyPage = ( { user } ) => {
    const navigate = useNavigate();




    return (
        <>
            <div className="container mt-4">
                <Row>
                    <Col>
                        <h1>Mina sidor</h1>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Min profil</Card.Title>
                                <Card.Text>
                                    Se och uppdatera dina kontaktuppgifter.
                                </Card.Text>
                                <Button onClick={() => navigate("/profile")}>
                                    Gå till profil
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Mina betalningar</Card.Title>
                                <Card.Text>
                                    Se ersättning per månad.
                                </Card.Text>
                                <Button onClick={() => navigate("/payments")}>
                                    Visa betalningar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-4 col-md-12">
                        <h2>Tillgängliga block</h2>
                    </Col>

                </Row>
                <Row>
                    <Col className="mt-3 col-md-12">
                        <ScheduleOpenBlocks user={user} />
                    </Col>

                </Row>
            </div>
        </>
    );
};

export default MyPage;
