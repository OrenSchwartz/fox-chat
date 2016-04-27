app.factory('getMessagesSrvc', function($http) {
    var messages = null;
    var query = function(room,roomMessagesDict){
        room = room.toUpperCase();
        $http.get(serverBaseUrl + '/msg?room=' + room)
            .then(function(messagesQueryRes) {
                importRoomMessages(room, roomMessagesDict, messagesQueryRes);
            }
            ,function (err){console.error("could not fetch messages from server");}
            ,function (err){console.error("time out on fetch messages from server");}
            );      
    };
    
    return function(room,roomMessagesDict){
        return query(room,roomMessagesDict);
    } 
});

function importRoomMessages(room, roomMessagesDict, messagesQueryRes) {
// retrieve data
    var messages = messagesQueryRes.data;

    // background process started working without
    // the room being initialized.
    if (messages != null && room != '') {
        // no cached data for the room, so we want to take all the data.
        if (!(room in roomMessagesDict) || roomMessagesDict[room] == null) {
            roomMessagesDict[room] = messages;
        }
        // room already exists, so we add new data to it.
        for (i = roomMessagesDict[room].length; i < messages.length; i++) {
            roomMessagesDict[room].push(messages[i]);
        }
    }
}