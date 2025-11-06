
import React from 'react'

import { CgScrollV } from "react-icons/cg";

import Button from 'react-bootstrap/Button'

const Hero = ({ title, subtitle, ctaText, ctaHref }) => {
    return (
        <div className="cover-container">
            <main className="purple-rain p-5">
                {title && <h1 className="display-1">{title}</h1>}
                {subtitle && <p className="lead fw-bold">{subtitle}</p>}
                {ctaText && ctaHref && (
                    <p className="lead mt-3">
                        <Button href={ctaHref} className="my-5 px-5 btn-lg outline-light">
                            {ctaText}
                        </Button>
                    </p>
                )}
                <CgScrollV className="fs-1"/>
            </main>
        </div>
    )
}

export default Hero
