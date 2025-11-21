

import React from 'react'
import { CgScrollV } from "react-icons/cg";
import { Container, Row, Col } from 'react-bootstrap'
import ScheduleToday from '../components/ScheduleToday';
import Hero from "../components/layout/Hero"

const UpComing = () => {


    return (
        <>
            <Hero
                title="Upcoming"
                subtitle="We’re here to rock around the clock and nobody can stop us!"
                ctaText="Check out..."
                ctaHref="/upcoming#rest"
            />

            <div id="rest">
                <ScheduleToday />
            </div>
        </>
    )
}

export default UpComing
