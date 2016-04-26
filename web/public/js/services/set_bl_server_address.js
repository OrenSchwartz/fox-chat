/**
 * Created by Oren on 4/26/2016.
 */
app.factory('setBLServerAddress', function($http) {
    return new Promise(function(resolve, reject) {
            $http.get(webServerBaseUrl + '/bl_server_address')
                .then(function(res) {
                    serverBaseUrl = res.data.bl_server_address;
                    console.info("angular found out that the bl server is " + serverBaseUrl);
                    resolve();
                }
                ,function (err){console.error("could not fetch bl server address"); reject();}
                ,function (err){console.error("time out on fetch bl server address");reject();}
            );
        });
});