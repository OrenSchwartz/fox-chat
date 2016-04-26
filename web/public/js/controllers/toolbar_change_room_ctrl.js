app.controller('toolbarChangeRoomCtrl', function ($scope, $mdDialog, $http, getMessagesSrvc) {
    $scope.changeRoom = function (clickedRoom) {
        console.info('PARENT data' + $scope.$parent.username + clickedRoom);
        $scope.$parent.$parent.room = clickedRoom.toUpperCase();
        getMessagesSrvc($scope.$parent.$parent.room,$scope.$parent.$parent.roomMessagesDict );
};
});