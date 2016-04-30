app.factory('authenticateUserSrvc', function($http, $cookieStore) {
    return function(profile){
        return new Promise(function(resolve, reject) {
            $http.post(webServerBaseUrl + '/authenticate', profile)
                .success(function (data, status, headers, config) {
                    console.info("authenticated user " + profile);
                    $cookieStore.token = data.token;
                    $cookieStore.profile = profile;
                    resolve(profile);
                })
                .error(function (data, status, headers, config) {
                    console.error("could not authenticate user: " +data);
                    try {
                        delete $cookieStore.profile;
                        delete $cookieStore.token ;
                    }
                    catch (e){}
                    reject;
                });
        })
    }
    });