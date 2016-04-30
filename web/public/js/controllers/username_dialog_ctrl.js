// This is the modal listener
function userNameDialogCtrl($scope, $mdDialog, $http, $cookieStore, authenticateUserSrvc) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        authenticateUserSrvc({'username' : answer}).then(
             function(){$mdDialog.hide(answer);}
            ,function (err){console.error("could not authenticate user " + answer );}
            ,function (err){console.error("could not authenticate user " + answer + " on time");}
        );
    };
}

// Responsible for creating and handling the modal results
function showUserNameModal(ev, $scope, $mdDialog, getMessagesSrvc, $mdMedia, $cookieStore, authenticateUserSrvc) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    sessionUsername = $cookieStore.username ? $cookieStore : null;
    username = $scope.username || sessionUsername;
    if (username == null || username == '') {
        $mdDialog.show({
                controller: userNameDialogCtrl,
                templateUrl: 'partials/username_dialog_view.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                fullscreen: useFullScreen,
                escapeToClose:false
        })
            .then(function (answer) {
                $scope.username = answer;
                $scope.room = 'GENERAL';

                // load messages to initialize window content.
                getMessagesSrvc($scope.room, $scope.roomMessagesDict);

                // set focus on the message field after the modal has closed.
                document.getElementsByClassName('message_text')[0].focus();
            });
    }
};
    