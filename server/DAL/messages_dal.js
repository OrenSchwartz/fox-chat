'use strict';

function messagesDAL(){
  this.retrieve = function(room){
    return new Promise(function(resolve, reject) {
        var messages = require('../models/messages_model');

        messages.find({
                    'room': room
                    })
            .exec(function(err, msgs) {
                if (err) {
                    console.error(err);
                    return reject(err); // don't forget to return here
                }
                    return resolve(msgs);
                });
        });
    };
    
    this.create = function(message){
        return new Promise(function(resolve, reject) {
            var MessagesModel = require('../models/messages_model');
            
            //Create message
            var newMsg = new MessagesModel({
                username: message.username,
                content: message.message,
                room: message.room.toLowerCase(),
                created: new Date()
            });
            //Save it to database
            newMsg.save(function(err, msg){
                if (err){
                    console.error(err);
                    return reject(err); // don't forget to return here
                }
                else{
                    console.info('message created'+ msg);
                    return resolve(msg);
                }
            });
        });
    };
}

module.exports = new messagesDAL();