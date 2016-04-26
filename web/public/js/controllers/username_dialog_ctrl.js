// This is the modal listener
function userNameDialogCtrl($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}

// Responsible for creating and handling the modal results
function showUserNameModal(ev, $scope, $mdDialog, getMessagesSrvc, $mdMedia) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    if ($scope.username == null || $scope.username == '') {
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
    