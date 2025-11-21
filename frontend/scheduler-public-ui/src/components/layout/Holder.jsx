import { useState } from "react";
import { ListGroup, Card, Row, Col, Container, Button } from "react-bootstrap";
import { FaPlay, FaMusic, FaBroadcastTower } from "react-icons/fa";
import { CgScrollV } from "react-icons/cg"

import ScheduleToday from "../ScheduleToday";
import WaveForm from "./WaveForm";

const Holder = ({ title, subtitle, ctaText, ctaHref }) => {

    const [schedule, setSchedule] = useState([]);

    const handleLoaded = (data) => setSchedule(data);

    const now = new Date();

    const currentBlock = schedule.find(b => {
        const start = new Date(`${b.date}T${b.startTime}`);
        const end = new Date(`${b.date}T${b.endTime}`);
        return start <= now && end > now;
    });

    const nextBlock = schedule
        .filter(b => {
            const start = new Date(`${b.date}T${b.startTime}`);
            return start > now;
        })
        .sort((a, b) => new Date(`${a.date}T${a.startTime}`) - new Date(`${b.date}T${b.startTime}`))
        .slice(0, 1);


    return (
        <>  <ScheduleToday onLoaded={handleLoaded} showList={false} />

            <div className="hero">
                <main className="purple-rain p-5">
                    <WaveForm />
                    {title && <h1 className="display-1">{title}</h1>}
                    {subtitle && <p className="lead fw-bold">{subtitle}</p>}
                    
                    {currentBlock ? (
                        <Card className="mb-4 p-3 bg-danger text-white w-100">
                            <h3 className="mt-0 mb-4">Broadcasting!</h3>
                            <FaPlay /><h1><strong>{currentBlock.title}</strong></h1>
                            <p>{currentBlock.startTime} - {currentBlock.endTime}</p>
                        </Card>
                    ) : (
                        <Card className="mb-4 p-3 bg-danger text-white w-100">
                            <h3 className="mt-0 mb-4">Broadcasting!</h3>
                                <FaPlay className="fs-1"/><h1>Rock Music Non Stop</h1>
                            <p>Between the sessions we will always Rock!</p>
                        </Card>
                    )}
                    {ctaText && ctaHref && (
                        <p className="lead mt-3 mb-0">
                            <Button href={ctaHref} className="my-5 px-5 btn-lg outline-light">
                                {ctaText}
                            </Button>
                        </p>
                    )}
                    <CgScrollV className="fs-1 mt-0" />
                </main>
            </div>
        </>


    )
}

export default Holder