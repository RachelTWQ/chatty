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
  // Set up broadcast function to send back content to all the connected clients
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach((client) => {
      if (client.readyState === socket.OPEN) {
        client.send(JSON.stringify(data))
      }
    })
  }
  // Send connected clients counts to all connected clients upon new client connection 
  wss.broadcast(wss.clients.size);

  ws.on('message', function incoming(data) {
    const incomingData = JSON.parse(data);
     
    incomingData["id"] = uuidv1();
    if (incomingData.type === "postMessage") {
      // Prevent empty message entry
      if (incomingData.content.trim().length > 0) {
      incomingData.type = "incomingMessage";
      }
    } else if (incomingData.type === "postNotification") { 
      incomingData.type = "incomingNotification";
    } else {
      throw new Error("Unknown event type " + data.type);
    }
    wss.broadcast(incomingData);
   }
    
  );
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    // Update connected clients counts to all connected clients upon clinet disconnection
    wss.broadcast(wss.clients.size);
    console.log('Client disconnected');
  });
});