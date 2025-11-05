
import React from 'react'
import { CgScrollV } from "react-icons/cg";
import Container from 'react-bootstrap/Container'
import ScheduleToday from '../components/ScheduleToday';

const UpComing = () => {
    return (
        <>
            <section className="purple-rain p-5">
                <h1 className="display-1">Upcoming Schedule</h1>
                <p className="lead fw-bold">
                    Our mission is loud and clear — we’re here to rock around the clock.
                </p>
                <CgScrollV className="fs-1 mb-1" />
            </section>
            <Container className="purple-rain p-5 mt-5">
                <ScheduleToday/>
            </Container>
        </>
    )
}

export default UpComing
