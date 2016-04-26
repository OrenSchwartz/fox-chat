var mongoose     = require('../mongoose');
var Schema       = mongoose.Schema;

//Create a schema for chat
var MessageModel = mongoose.Schema({
  created: Date,
  content: String,
  username: String,
  room: String
});

module.exports = mongoose.model('chats', MessageModel);
