import { useState, useEffect } from 'react';

import { getAll } from './api/scheduleApi';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Container from 'react-bootstrap/Container';

import Home from "./pages/Home";
import All from "./pages/All";
import Today from "./pages/Today";
import EditBlock from './components/EditBlock';


import Menu from "./components/Menu";
import NewBlock from './pages/NewBlock';

function App() {

  return (
      <>
          <BrowserRouter>
            <Container fluid className="mt-0">
            <Menu />
            </Container>
            <Container className="d-flex justify-content-center align-items-center mt-5">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/all" element={<All />} />
                      <Route path="/today" element={<Today />} />
                      <Route path="/newblock" element={<NewBlock />} />
                      <Route path="/edit/:id" element={<EditBlock />} />
                </Routes>
            </Container>
          </BrowserRouter>
      </>
  )
}

export default App
