const express = require('express');

// create an instance of an express app
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

const players = {};

app.use(express.static(__dirname + '/public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.get("/quiz_plugin.js", function(req, res) {
  res.sendFile(__dirname + '/public/js/quiz_plugin.js');
});
app.get("/button_plugin.js", function(req, res) {
  res.sendFile(__dirname + '/public/js/button_plugin.js');
});

server.listen(port, function () {
   console.log(`Listening on ${server.address().port}`);
});

var currentOrderPosition = 0;

io.on('connection', function (socket) {
  console.log('a user connected: ', socket.id);
  // create a new player and add it to our players object
  players[socket.id] = {
    // Identifires
    playerId: socket.id,
    playerName: "player_name",
    playerColor: "0x000000",
    // Board variables
    position: 0,
    orderPosition: 0,
    lastDice: 1,
    points: 0,
    // Currencies
    wind: 0,
    fire: 0,
    dove: 0,
    // Inventory
    wisdom: 0,
    insight: 0,
    advice: 0,
    strength: 0,
    understanding: 0,
    piety: 0,
    fearofgod: 0
  };
  // send the players object to the new player
  socket.emit('currentPlayers', players);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);

  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function () {
    console.log('user disconnected: ', socket.id);
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);
  });

  // when a plaayer moves, update the player data
  socket.on('playerMovement', function (movementData) {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    players[socket.id].flipX = movementData.flipX;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });

  // when a player commits a turn
  socket.on("playerTurn", function (turnData) {
    // check if it is the turn of the player who commited his turn
    if (currentOrderPosition == players[socket.id].orderPosition) {
      //

      // emit a message to all players about the turn
      socket.broadcast.emti('playerCommitedTurn', players[socket.id]);
    }
  });
});
