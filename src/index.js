import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './app.css'

import logo from './assets/logo.png'

function App()
{
    const [poll, setPoll] = useState({});

    useEffect(() => 
        { 
            const url = new URL("http://localhost:5000/polls/1");
            fetch(url).then(response => response.json()).then(data => { setPoll(data.poll) }).catch(error => { console.log(error); });
        }, [])

    return (
        <>
        <img id="logo" alt="logo" src={logo} />
        <h1>{poll.question}</h1>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);