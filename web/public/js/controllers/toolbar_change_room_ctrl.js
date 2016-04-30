app.controller('toolbarChangeRoomCtrl', function ($scope, $mdDialog, $http, getMessagesSrvc, $cookieStore) {
    $scope.changeRoom = function (clickedRoom) {
        console.info('PARENT data' + $scope.$parent.username + clickedRoom);
        $scope.$parent.$parent.room = clickedRoom.toUpperCase();

        // update messages
        getMessagesSrvc($scope.$parent.$parent.room,$scope.$parent.$parent.roomMessagesDict)
            .then(function(){
                // update last room cookie
                var profile = $cookieStore.get('profile');
                profile['last_room'] = clickedRoom.toUpperCase();
                $cookieStore.put('profile', profile);
            });


    };
});