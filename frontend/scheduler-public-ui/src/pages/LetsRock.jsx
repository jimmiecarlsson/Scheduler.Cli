
import React from 'react'
import { CgScrollV } from "react-icons/cg";
import Button from 'react-bootstrap/Button'


const LetsRock = () => {
    return (
        <>
            <section className="purple-rain p-5">
                <h1 className="display-1">Let's Rock!</h1>
                <p className="lead fw-bold">
                    Our mission is loud and clear — we’re here to rock around the clock.
                </p>
                <CgScrollV className="fs-1 mb-1" />
            </section>
        </>
    )
}

export default LetsRock
