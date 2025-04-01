# Dizplai Polls Web App
## Summary
A simple web app created for the Dizplai Technical Test where users can place a vote on the poll fetched from the server-side of the application. </br>

## Prerequisites
This project only requires that [Node.js](https://nodejs.org/en) is installed. </br>
**Node.js v22.14.0 was used for this project.**

## Setting up the project
Setting up this project is a very straightforward process. Firstly, clone a copy of this repository onto your computer:
```
git clone https://github.com/BAKAJ77/dizplai-polls-app.git
```

Once done, run the following command in the project's root directory:
```
npm install
```

This command will automatically install all the Node module dependencies used in this project such as `express`, `cors`, etc. </br>
Once this is completed successfully, the project will be ready for execution.

## Running the project locally
You will only need to execute 2 commands from the project's root directory to get the project up-and-running locally. </br>
**Note: Both of these commands will need to be executed in seperate command prompt tabs.** </br> </br>
First, startup the web app's back-end server with the following command:
```
node src/backend/server.js
```

Now that the back-end server is running, we can execute the development server.
```
npm start
```

To access the web app on the host machine's web browser, simply navigate to `http://localhost:<port>`. However, to access the web app on any other device, 
which is connected to the same network, you will have to navigate to `http://<IPv4 Address>:<port>` instead.

- Replace `<port>` with the port the development server is using, this should be displayed after executing the `npm start` command.
- Replace `<IPv4 Address>` with the host machine's IPv4 address, this can found by executing the `ipconfig` command.

## Possible future improvements?
- The server API's `CORS` rules have been set to allow requests of any origin to access the server's resources, this could pose a problem as private server resources could be accessed by anyone.
This could be mitigated by configuring `CORS` to only allow requests originating from the website's URL; requests of any other origin will be automatically rejected.
- The website currently exchanges data using basic `HTTP`, data is transferred as plain text which leaves it vulnerable to eavesdropping and tampering. This could be prevented by using `HTTPS` instead
since data is protected via encryption using `SSL/TSL`.
- Right now, only the hard-coded poll can be voted on. In production, there could be a preceeding web page that displays the list of different polls that a user can select to vote on.
- Currently, the poll data is stored in memory on the local machine running the back-end server. In production, the data could be stored in a dedicated database (`MySQL`?), which will also allow for
new polls to be added easily.
