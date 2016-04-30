var mongoose     = require('../../node_modules/mongoose');
var Schema       = mongoose.Schema;

//Create a schema for chat
var MessageModel = mongoose.Schema({
  created: Date,
  content: String,
  username: String,
  cookie: String,
  room: String
});

module.exports = mongoose.model('chats', MessageModel);
