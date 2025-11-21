import { useState } from 'react'
import './App.css'
import Container from 'react-bootstrap/Container';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';


function App() {
    const [count, setCount] = useState(0)

    const location = useLocation();

    const isUpcoming = location.pathname === '/upcoming';

    return (
        <>
            <div className="cover-container vh-100">
                <Header />
                    <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default App
