import Header from './Header'
import Footer from './Footer'
import React from 'react'

const MainLayout = () => {
    return (
        <>
       

            <div>
                <Header />
                <main className="px-3">

                    <h1>Cover your page.</h1>
                    <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
                    <p className="lead">
                        <a href="#" className="btn btn-lg btn-light fw-bold border-white bg-white">Learn more</a>
                    </p>

                </main>
                <Footer />
            </div>
        </>



    )
}

export default MainLayout
