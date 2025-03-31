const polls = 
[
    {
        "pollID": 1,
        "pollName": "Premier League Winner",
        "question": "Who will win the Premier League?",
        "options": [
            {
                "id": 1,
                "text": "Manchester City"
            },
            {
                "id": 2,
                "text": "Arsenal"
            },
            {
                "id": 3,
                "text": "Liverpool"
            }
        ]
    }
]

const votes = 
[
    {
        "pollID": 1,
        "options": [
            {
                "id": 1,
                "text": "Manchester City",
                "numVotes": 0
            },
            {
                "id": 2,
                "text": "Arsenal",
                "numVotes": 0
            },
            {
                "id": 3,
                "text": "Liverpool",
                "numVotes": 0
            }
        ]
    }
]

const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json(), cors());

// GET Request that returns the entire list of existing polls
app.get("/polls", (req, res) => 
    { 
        res.json({ message: "Returning list of existing polls", pollList: polls  }) // Constructs the JSON data to send in response
    }
);

// GET Request that returns a specific poll (if existing)
app.get("/polls/:id", (req, res) => 
    { 
        const requestedPollID = req.params.id;
        const returnedPoll = polls.find((poll) => { return poll.pollID == requestedPollID; });

        if (returnedPoll) // Success, the poll was found
            res.json({ message: "Returning requested poll", poll: returnedPoll });
        else
        {
            // Failure, the poll doesn't exist
            res.status(404); // 404 -> NOT FOUND ERROR
            res.json({ message: "Requested poll does not exist (ID: " + requestedPollID + ")" });
        }
    }
);

// GET Request that returns a list of vote results for each existing poll
app.get("/votes", (req, res) => 
    { 
        res.json({ message: "Returning list of votes for existing polls", pollList: votes  });
    }
);

// GET Request that returns the current vote results for the requested poll
app.get("/votes/:id", (req, res) =>
    {
        const requestedPollID = req.params.id;
        const returnedPollVotes = votes.find((poll) => { return poll.pollID == requestedPollID; });

        if (returnedPollVotes)
            res.json({ message: "Returning votes associated with requested poll", votes: returnedPollVotes });
        else
        {
            res.status(404);
            res.json({ message: "Associated poll from request does not exist (ID: " + requestedPollID + ")" });
        }
    }
);

// POST Request that sends the user's vote to the server
app.post("/votes", (req, res) => 
    {
        // Expected format would be: { pollID: int, optionID: int } //

        const userVote = req.body;
        const relatedPoll = votes.find((poll) => { return poll.pollID == userVote.pollID; }); // Find the related poll first

        if (relatedPoll)
        {
            const voteOption = relatedPoll.options.find((option) => { return option.id == userVote.optionID; }); // Find the voted option
            if (voteOption)
            {
                voteOption.numVotes += 1;
                res.json({ message: "User vote has been registered" })
            }
            else
            {
                res.status(422); // 422 -> UNPROCESSABLE ENTITY ERROR
                res.json({ message: "Vote option does not exist (ID: " + userVote.optionID + ")" });
            }
        }
        else
        {
            res.status(422);
            res.json({ message: "Poll does not exist (ID: " + userVote.pollID + ")" })
        }
    }
);

app.listen(port, (error) => 
    { 
        !error ? console.log("Server is running on http://localhost:" + port) : console.log("An error occurred, failed to start server", error); 
    }
);