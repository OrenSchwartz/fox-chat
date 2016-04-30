"use strict";
var RESOURCE = '/msg';
var DAL_OBJ_REF = '../DAL/messages_dal';

function messagesEP(){
    this.getMsgsByRoomListener = function(app){
        //This route produces a list of chat as filterd by 'room' query
        app.get(RESOURCE, function(req, res) {
            var room = req.query.room;
            if (typeof room === 'undefined' || room == '')
                room = 'general';

            var messagesDAL = require(DAL_OBJ_REF);
            //Find
            messagesDAL
                .retrieve(room.toLowerCase())
                .then(function(msgs){res.json(msgs);})
                .catch(function(err){
                    console.error("could not retieve messages from db: " + err);
                    res.status(500);
                })
        })
    };
    
    this.createMessageListener = function(app){
        app.post(RESOURCE, function(req, res) {
        
            var messagesDAL = require(DAL_OBJ_REF);
            messagesDAL
                .create(req.body)
                .then(function(msg){
                    res.json({"created":true, "message": "message createed", "content":msg});
                    res.status(201);
                })
                .catch(function(err){
                    console.error("could not create messages from db: " + err);
                    res.status(500);
                });
        })
    };
}

module.exports = new messagesEP();