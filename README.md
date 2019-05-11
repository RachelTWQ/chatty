# Chatty App
=====================

A minimal aclient-side SPA (single-page app) built with ReactJS. It allows users to communicate with each other without having to register accounts.

## Getting Started

Fork this repository, then clone your fork of this repository. Install the dependencies and start the server from chatty_server folder.

```
npm install
npm start
```

Install the dependencies and start the server from root folder.

```
npm install
npm start
open http://localhost:3000
```

## Stack

* Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
* WebSockets using Node package ws on the server-side, and native WebSocket on client side
* ReactJS

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```


## Feature

* The client-side app communicates with a server via WebSockets for multi-user real-time updates
* When any connected user enter username and hit ENTER, a notification about name change will be sent and displayed to all current connected users
* Any connected user can change to anonymous by hit ENTER without entering their name and their username will remain unchanged before any username update
* Any connected user can type non-empty message and hit ENTER to send and display message to all current connected users
* Current user count real-time updates to all connected clients in header
* Each user connected to the server is randomly assigned a fixed color upon connection for their username display

## Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* express
* ws

## Screenshot
!["Screenshot of realtime multiple users  display"](https://github.com/RachelTWQ/chatty/blob/master/screenshots/realtime-multiple-users-%20display.png)

!["Screenshot of fixed username color"](https://github.com/RachelTWQ/chatty/blob/master/screenshots/fixed-username-color.png)

!["Screenshot of user count display"](https://github.com/RachelTWQ/chatty/blob/master/screenshots/user-count-display.png)

!["Screenshot of anonymous username"](https://github.com/RachelTWQ/chatty/blob/master/screenshots/anonymous-username.png)