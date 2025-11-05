import { useState } from 'react'
import './App.css'
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Container className="cover-container">
                <Header />
                    <Outlet />
                <Footer />
            </Container>
        </>
    )
}

export default App
