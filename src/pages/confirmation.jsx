import React, { useState, useEffect } from 'react';
import './app.css'

function ConfirmationPage()
{
    const [votes, setVotes] = useState({ options:[] })

    const hostname = window.location.hostname;

    function GetVotePercentage(option, optionList) // Returns the given option's vote percentage share in the poll
    {
        // Calculate the total amount of votes submitted for the poll
        var totalVotes = 0;
        for (let i = 0; i < optionList.length; i++)
            totalVotes += optionList[i].numVotes;

        if (totalVotes === 0)
            return 0;

        // This is a simple algorithm to ensure that the percentages displayed for each vote option always add up to 100%
        // The theory behind the method is provided here: https://stackoverflow.com/a/13483486
        var culumativePercentage = 0, previousBaseline = 0;
        for (let i = 0; i < optionList.length; i++)
        {
            culumativePercentage += (optionList[i].numVotes / totalVotes) * 100;
            if (optionList[i].id === option.id)
                break;

            previousBaseline = Math.round(culumativePercentage);
        }

        return Math.round(culumativePercentage) - previousBaseline;
    }

    useEffect(() =>
        {
            let url = new URL("http://" + hostname + ":5000/votes/1");
            fetch(url).then(response => response.json()).then(data => 
                { 
                    data.votes.options.sort((a, b) => { return b.numVotes - a.numVotes; }); // Sort the vote options in descending order (based on amount of votes)
                    setVotes(data.votes);
                }).catch(error => { console.log(error); });
        }, [hostname, votes.options]);
    


    return ( 
        <>
        <h1 className="outline-font">Thank you for your response</h1>
        {
            votes.options.map((option, index) => 
                { 
                    return (
                        <div key={index} className="outline-font voteBarContainer">
                            <div style={{width:GetVotePercentage(option, votes.options) + "%", position:"absolute", height:"60px"}}>
                                <span className="voteBar" />
                            </div>

                            <p className="voteText">{option.text}</p>
                            <p className="percentage">{ GetVotePercentage(option, votes.options) + "%" }</p>
                        </div>
                    ) 
                }
            )
        }
        </>
    )
}

export default ConfirmationPage;