
import React from 'react'

import { Row, Col } from 'react-bootstrap'

const WaveForm = () => {
    return (
        <>
            <Row className="">
                <Col className="col-md-12 purple-rain">
                    <div class="waveform py-2 px-2">
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default WaveForm
