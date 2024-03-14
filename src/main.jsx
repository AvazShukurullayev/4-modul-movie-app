import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/index.scss"
import App from "./components/app/App.jsx";
import {BrowserRouter} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
