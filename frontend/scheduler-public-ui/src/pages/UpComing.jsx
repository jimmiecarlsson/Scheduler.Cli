

import React from 'react'
import { CgScrollV } from "react-icons/cg";
import { Container, Row, Col } from 'react-bootstrap'
import ScheduleToday from '../components/ScheduleToday';
import Hero from "../components/layout/Hero"

const UpComing = () => {


    return (
        <>
            <Hero
                title="Upcoming Schedule"
                subtitle="Our mission is loud and clear — we’re here to rock around the clock."
                ctaText="Rock Me"
                ctaHref="/upcoming#rest"
            />

           
                <main className="fill purple-rain p-5" id="rest">
                <Row className="justify-content-center fill mb-5">
                    <Col md={10} lg={8}>
                            <ScheduleToday />
                        </Col>
                    </Row>
                </main>
        </>
    )
}

export default UpComing
