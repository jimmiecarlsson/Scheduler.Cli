import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'
import LetsRock from './pages/LetsRock'
import MainComponent from './components/MainComponent';
import UpComing from './pages/UpComing';
import Presenters from './pages/Presenters';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <MainComponent />,
            },
            {
                path: 'letsrock',
                element: <LetsRock />,
            },
            {
                path: 'presenters',
                element: <Presenters />,
            },
            {
                path: 'upcoming',
                element: <UpComing />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
  </StrictMode>,
)
