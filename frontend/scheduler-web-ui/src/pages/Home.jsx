import { useState } from "react";
import { FaMicrophoneAlt, FaStepForward, FaMusic, FaBroadcastTower } from "react-icons/fa";
import { ListGroup, Card, Row, Col, Container } from "react-bootstrap";
import ScheduleToday from "../components/ScheduleToday";

export default function Home() {
    const [schedule, setSchedule] = useState([]);

    const handleLoaded = (data) => setSchedule(data);

    const now = new Date();

    const currentBlock = schedule.find(b => {
        const start = new Date(`${b.date}T${b.startTime}`);
        const end = new Date(`${b.date}T${b.endTime}`);
        return start <= now && end > now;
    });

    const upcomingBlocks = schedule.filter(b => {
        const start = new Date(`${b.date}T${b.startTime}`);
        return start > now;
    });


    return (
        <>
            <Container className="d-flex justify-content-center mt-5">
                <Row className="w-100 justify-content-center">
                    <Col className="col-md-6">
                        <ScheduleToday onLoaded={handleLoaded} showList={false} />

                        <h5 className="mt-0 mb-4"><FaBroadcastTower className="me-2" />I SÄNDNING!</h5>

                        {currentBlock ? (
                            <Card className="mb-4 p-3 bg-danger text-white w-100">
                                <p><strong>{currentBlock.title}</strong></p>
                                <p>{currentBlock.startTime} - {currentBlock.endTime}</p>
                                <p>Studio {currentBlock.studio}</p>
                            </Card>
                        ) : (
                                <Card className="mb-4 p-3 bg-danger text-white w-100">
                                <FaMusic className="me-2" />Music
                            </Card>
                        )}

                        {upcomingBlocks.length > 0 && (
                            <>
                                     <h5 className="mt-0 mb-4"><FaStepForward className="me-2" />Kommande</h5>
                                    {upcomingBlocks.map(block => (
                                        <Card className="mb-4 p-3 bg-secondary text-white w-100" key={block.id}>
                                        <p >
                                            {block.startTime} - {block.endTime} <strong>{block.title}</strong>
                                        </p>
                                        </Card>
                                    ))}
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}
