app.controller('mainCtrl', function ($scope, $mdDialog, $http, getRoomsSrvc, getMessagesSrvc, postMessageSrvc, $timeout,$mdMedia) {
    $scope.roomMessagesDict = {};
    $scope.room = "";
    $scope.username = "";
    $scope.rooms = [];

    $scope.initPage = function (ev) {
        //Launch Modal
        showUserNameModal(ev, $scope, $mdDialog, getMessagesSrvc, $mdMedia);

        getRoomsSrvc($scope.rooms,$scope.room);
    };

    $scope.send = function (msg) {
        postMessageSrvc(msg, $scope.room, $scope.username);

        // clear message text after it was posted to the server
        document.getElementsByClassName('message_text')[0].value = '';
    };

    // Get room messages periodically
    var lastHeight = 0;
    (function tick() {
        getMessagesSrvc($scope.room,$scope.roomMessagesDict);

        // scroll down the list view, once it is updated.
        var objDiv = document.getElementsByClassName('scrollable_content')[0];
        if (lastHeight != objDiv.scrollHeight) {
            lastHeight = objDiv.scrollTop = objDiv.scrollHeight;
        }

        $timeout(tick, 100);
    })();
});