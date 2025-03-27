const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/polls", (req, res) => { res.json({ message: "Returning list of polls" }) });
app.post("/polls", (req, res) => { res.json({ message: "Poll created", poll:req.body }) });
app.put("/polls/:id", (req, res) => { res.json({ message: "Poll has been updated", updatedPollID:req.params.id }) });

app.listen(port, () => { console.log("Server is running on http://localhost:${port}"); });