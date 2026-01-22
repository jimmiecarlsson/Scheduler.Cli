import { FaMicrophoneAlt, FaStepForward, FaMusic, FaBroadcastTower } from "react-icons/fa";
import { ListGroup, Card, Row, Col, Container } from "react-bootstrap";
import ScheduleToday from "../components/ScheduleToday";

import { useEffect, useState } from "react";
import { getCurrentSong } from "../api/scheduleApi";

export default function Home() {
    const [schedule, setSchedule] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const loadSong = async () => {
            try {
                const song = await getCurrentSong();
                setCurrentSong(song);
            } catch {
                setCurrentSong(null);
            }
        };

        loadSong();
        const interval = setInterval(loadSong, 60000);
        return () => clearInterval(interval);
    }, []);

    // visa tiden som är kvar på låten
    useEffect(() => {
        if (!currentSong?.endsAtUtc) {
            setTimeLeft(null);
            return;
        }


        const endsAt = new Date(currentSong.endsAtUtc);

        const tick = () => {
            const now = new Date();

            const diffSeconds = Math.floor((endsAt - new Date()) / 1000);

            if (diffSeconds <= 0) {
                setTimeLeft(0);
                loadSong(); //Om låten är slut borde det finns en ny
                return;
            }

            setTimeLeft(diffSeconds);
        };

        tick();
        const intervalId = setInterval(tick, 1000);

        return () => clearInterval(intervalId);
    }, [currentSong]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };




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
                                    {currentSong ? (
                                        <>
                                            <FaMusic className="me-2" />
                                            <strong>{currentSong.title}</strong><br />
                                            {currentSong.artist}

                                            {timeLeft !== null && (
                                                <div className="mt-2 text-white">
                                                    Time left: {formatTime(timeLeft)}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        "Music"
                                    )}
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
