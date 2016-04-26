"use strict";
var RESOURCE = '/rooms';
function roomsEP(){
    this.getRoomsListener = function(app){
        //This route produces a list of chat as filterd by 'room' query
        app.get(RESOURCE, function(req, res) {
            res.status(200);
            return res.json({"rooms": ["AM", "meeting place", "General", "MUTD", "express", "node"],
                      "defaultRoom" : "General"});
        });
    };
}
    
module.exports = new roomsEP();
