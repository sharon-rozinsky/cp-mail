var mailin = require('mailin');
var MongoRepository = require('./app/dal/MongoRepository');
const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var config = require('./config/config');
var socketio = require('socket.io');

// socket.io init
var client = socketio.listen(config.socketPort).sockets;

// express init
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
require('./app/routes.js')(app);
app.listen(config.apiPort, function () {
  console.log('cp-mail server listeninig on port 3000');
})

// mailin init
mailin.start({
  port: 25,
  disableWebhook: true // Disable the webhook posting.
});

/* Access simplesmtp server instance. */
mailin.on('authorizeUser', function (connection, username, password, done) {
  if (username == "johnsmith" && password == "mysecret") {
    done(null, true);
  } else {
    done(new Error("Unauthorized!"), false);
  }
});

/* Event emitted when a connection with the Mailin smtp server is initiated. */
mailin.on('startMessage', function (connection) {
  //console.log(connection);
});

mailin.on('message', function (connection, data, content) {
  var message = {
    sender: data.headers.from,
    recepients: data.headers.to,
    subject: data.subject,
    description: data.subject,
    body: data.text,
    bodyHtml: data.html,
    dateReceived: new Date().toDateString(),
    isRead: false,
    isSelected: false
  }
  console.log(message);
  MongoRepository.addMessage(message);
  client.emit('new-message', message);
});

