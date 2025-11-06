import React from 'react'

import Hero from "./layout/Hero"

const MainComponent = () => {
    return (
        <>
            <Hero
                title="Welcome to Radio Gaga"
                subtitle="Our mission is loud and clear — we’re here to rock around the clock."
                ctaText="Let's rock!"
                ctaHref="/letsrock"
            />
        </>
    )
}

export default MainComponent
