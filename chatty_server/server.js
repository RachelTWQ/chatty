const express = require('express');
const SocketServer = require('ws').Server;
const socket = require("ws");
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  //   ws.on('open', function open() {
  //     ws.send('something');
  //   });
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach((client) => {
      if (client.readyState === socket.OPEN) {
        client.send(JSON.stringify(data))
      }
    })
  }

  wss.broadcast(wss.clients.size);

  ws.on('message', function incoming(data) {
    const incomingData = JSON.parse(data);
     
    incomingData["id"] = uuidv1();
    switch (incomingData.type) {
      case "postMessage":
        incomingData.type = "incomingMessage";
        break;
      case "postNotification":
        incomingData.type = "incomingNotification";
        break;
      default:
        throw new Error("Unknown event type " + data.type);
    }
    // console.log(incomingMsg);
    wss.broadcast(incomingData);
   }
    
  );
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});