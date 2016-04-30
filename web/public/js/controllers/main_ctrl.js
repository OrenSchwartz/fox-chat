app.controller('mainCtrl', function ($scope, $mdDialog, $cookieStore,
                                    getRoomsSrvc, getMessagesSrvc, postMessageSrvc,
                                    setBLServerAddressSrvc, authenticateUserSrvc, $timeout,$mdMedia) {
        $scope.roomMessagesDict = {};
    $scope.room = "";
    $scope.username = "";
    $scope.rooms = [];

    $scope.initPage = function (ev) {
        //Launch Modal
        showUserNameModal(ev, $scope, $mdDialog, getMessagesSrvc, $mdMedia, $cookieStore, authenticateUserSrvc);

        setBLServerAddressSrvc.
            then(
            function(){getRoomsSrvc($scope.rooms,$scope.room);}
            ,function (err){console.error("could not fetch bl server address from server");}
            ,function (err){console.error("time out on fetch bl server address from server");}
        );

    };

    $scope.send = function (msg) {
        postMessageSrvc(msg, $scope.room, $scope.username);

        // clear message text after it was posted to the server
        document.getElementsByClassName('message_text')[0].value = '';
    };

    // Get room messages periodically
    var lastHeight = 0;
    (function tick() {
        if (typeof $scope.username === 'undefined' || $scope.username == '')
            return;

        getMessagesSrvc($scope.room,$scope.roomMessagesDict);

        // scroll down the list view, once it is updated.
        var objDiv = document.getElementsByClassName('scrollable_content')[0];
        if (lastHeight != objDiv.scrollHeight) {
            lastHeight = objDiv.scrollTop = objDiv.scrollHeight;
        }

        $timeout(tick, 100);
    })();
});