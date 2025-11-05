import React from 'react'

import { CgScrollV } from "react-icons/cg";
import Button from 'react-bootstrap/Button'

const MainComponent = () => {
    return (
        <>
            <main className="purple-rain p-5">
                <h1 className="display-1">Welcome to Radio Gaga</h1>
                <p className="lead fw-bold">
                    Our mission is loud and clear — we’re here to rock around the clock.
                </p>
                <p className="lead mt-3">
                    <Button href="/letsrock" className="my-5 px-5 btn-lg outline-light">
                        Let's rock!
                    </Button>
                </p>
                <CgScrollV className="fs-1 mb-1" />
            </main>
        </>
    )
}

export default MainComponent
