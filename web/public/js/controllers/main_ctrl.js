app.controller('mainCtrl', function ($scope, $mdDialog, $cookieStore,
                                    getRoomsSrvc, getMessagesSrvc, postMessageSrvc,
                                    setBLServerAddressSrvc, authenticateUserSrvc, $timeout,$mdMedia) {
    $scope.roomMessagesDict = {};
    $scope.room = "";
    $scope.username = "";
    $scope.rooms = [];

    $scope.initPage = function (ev) {
        setBLServerAddressSrvc
        .then(
            function(){
                //Launch Modal
                showUserNameModal(ev, $scope, $mdDialog, getMessagesSrvc, $mdMedia, $cookieStore, authenticateUserSrvc);
            }
            ,function (err){console.error("could not fetch bl server address from server");}
            ,function (err){console.error("time out on fetch bl server address from server");}
        )
        .then(function() {
                getRoomsSrvc($scope.rooms, $scope.room);
            }
        )
    };

    $scope.send = function (msg) {
        postMessageSrvc(msg, $scope.room, $scope.profile);

        // clear message text after it was posted to the server
        document.getElementsByClassName('message_text')[0].value = '';
    };

    // Get room messages periodically
    var lastHeight = 0;
    (function tick() {
        if (serverBaseUrl == '' || typeof $scope.username === 'undefined' || $scope.username == '') {
            $timeout(tick, 100);
            return;
        }

        getMessagesSrvc($scope.room,$scope.roomMessagesDict).then();

        // scroll down the list view, once it is updated.
        var objDiv = document.getElementsByClassName('scrollable_content')[0];
        if (lastHeight != objDiv.scrollHeight) {
            lastHeight = objDiv.scrollTop = objDiv.scrollHeight;
        }

        $timeout(tick, 100);
    })();
});