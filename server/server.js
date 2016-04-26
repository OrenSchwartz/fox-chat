//Import all our dependencies
var express = require('../node_modules/express');
var mongoose = require('../node_modules/mongoose');
var cookieParser = require('../node_modules/cookie-parser');
var bodyParser = require('../node_modules/body-parser');
var app = express();
var server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Set our static file directory to public
app.use(express.static(__dirname + '/public'));

// generate connection string based on env tag.
if (env == 'development') {
    var connection_string = 'mongodb://127.0.0.1:27017/fox-chat';
    var port = 3030;
}
else {
    var connection_string = 'mongodb://oren:a@ds013981.mlab.com:13981/fox-chat';
    var port = process.env.SERVER_PORT;
}

//Connect to mongo DB database
mongoose.connect(connection_string);

// Create messages DAL and endpoint objects
messagesEP = require('./endpoints/messagesEP');
roomsEP = require('./endpoints/roomsEP');

//Allow CORS
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

//Route for our index file
app.get('/', function(req, res) {
  //send the index.html in our public directory
  res.sendfile('index.html');
});

// Listen to room requests
messagesEP.getMsgsByRoomListener(app);
messagesEP.createMessageListener(app);
roomsEP.getRoomsListener(app);

server.listen(port);
console.log('listening on port ' + port + '...');