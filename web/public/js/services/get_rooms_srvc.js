
app.factory('getRoomsSrvc', function($http) {
    var query = function(rooms, room){
        $http.get(serverBaseUrl + '/rooms')
            .then(function(roomsQueryData) {
                for (i=0; i<roomsQueryData.data.rooms.length; ++i)
                    rooms.push(roomsQueryData.data.rooms[i])
                room = roomsQueryData.data.defaultRoom;
            }
            ,function (err){
                console.error("could not fetch rooms from server: " + err.message);
                throw err;
            }
            ,function (err){console.error("time out on fetch rooms from server: " + err.message);}
            );      
    };
    
    return function(rooms, room){
        return query(rooms, room);
    } 
});