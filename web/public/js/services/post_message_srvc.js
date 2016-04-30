/**
 * Created by Oren on 4/25/2016.
 */
app.factory('postMessageSrvc', function($http) {
    var query = function(msg, room, user){
        room = room.toUpperCase();
        $http.post(serverBaseUrl + '/msg',
                   {"message":msg,"room":room, "username":user},
                   {"Content-Type": "application/json"})
            .then(function(messagesPostRes) {
                console.info('message created');
            }
            ,function (err){console.error("could not post a message on server:" + err);}
            ,function (err){console.error("time out on post a message on server:" + err);}
        );
    };

    return function(msg, room, user){
        return query(msg, room, user);
    }
});
