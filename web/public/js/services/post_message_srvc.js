/**
 * Created by Oren on 4/25/2016.
 */
app.factory('postMessageSrvc', function($http) {
    var query = function(msg, room, user){
        room = room.toUpperCase();
        $http.post(serverBaseUrl + '/api/msg',
                   {"message":msg,"room":room, "username":user},
                   {"Content-Type": "application/json"})
            .then(function(messagesPostRes) {
                console.info('message created');
            }
            ,function (err){console.error("could not fetch messages from server");}
            ,function (err){console.error("time out on fetch messages from server");}
        );
    };

    return function(msg, room, user){
        return query(msg, room, user);
    }
});
