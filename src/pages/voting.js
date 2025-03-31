import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './app.css'

function VotingPage()
{
    const [poll, setPoll] = useState({ options:[] });
    const [selectedVoteID, setSelectedVote] = useState(-1);
    const navigate = useNavigate();

    const hostname = window.location.hostname;
    
    function OnSubmitCallback()
    {
        let url = new URL("http://" + hostname  + ":5000/votes");
        fetch(url, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pollID: poll.pollID, optionID: selectedVoteID }) 
        }).then(() => { navigate("/confirmed") }).catch(error => { console.log(error) });
    }
    
    useEffect(() => 
        { 
            let url = new URL("http://" + hostname + ":5000/polls/1");
            fetch(url).then(response => response.json()).then(data => { setPoll(data.poll); }).catch(error => { console.log(error); });
        }, [hostname])

    return (
        <>
        <h1 className="outline-font">{poll.question}</h1>
        <div id="poll-section">
            {
                poll.options.map((option, index) => 
                { 
                    return <button key={index} className={"outline-font " + (selectedVoteID === option.id ? "selectedOption" : "option")} onClick={
                        (event) => { setSelectedVote(option.id); }}>{option.text}</button>
                })
            }

            <button id="submitButton" className="outline-font" onClick={OnSubmitCallback}>SUBMIT</button>
        </div>
        </>
    )
}

export default VotingPage;