// This is the modal listener
function userNameDialogCtrl($scope, $mdDialog, authenticateUserSrvc) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $scope.profile = {'username' : answer};
        authenticateUserSrvc($scope.profile).then(
             function(){$mdDialog.hide(answer);}
            ,function (err){console.error("could not authenticate user " + answer );}
            ,function (err){console.error("could not authenticate user " + answer + " on time");}
        );
    };
}

// Responsible for creating and handling the modal results
function showUserNameModal(ev, $scope, $mdDialog, getMessagesSrvc, $mdMedia, $cookieStore, authenticateUserSrvc) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    sessionProfile =  $cookieStore ? $cookieStore.get('profile') : null;
    username = $scope.username || (sessionProfile && sessionProfile.username)? sessionProfile.username : null;
    last_room = $scope.room || (sessionProfile&& sessionProfile.last_room) ? sessionProfile.last_room : 'GENERAL';

    function init_page_data(answer) {
        $scope.username = answer;
        $scope.room = last_room;

        // update profile
        $scope.profile = $cookieStore.get('profile');
        $scope.profile['username'] = answer;
        $cookieStore.put('profile',$scope.profile);

        $scope.token = $scope.profile.cookie;


        // load messages to initialize window content.
        getMessagesSrvc($scope.room, $scope.roomMessagesDict).then();

        // set focus on the message field after the modal has closed.
        document.getElementsByClassName('message_text')[0].focus();
    }

    if (!(username == null || username == '')){
        init_page_data(username);
    }
    else{
        $mdDialog.show({
                controller: userNameDialogCtrl,
                templateUrl: 'partials/username_dialog_view.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                fullscreen: useFullScreen,
                escapeToClose:false
        })
            .then(function (answer) {
                init_page_data(answer);
            });
    }
};
    