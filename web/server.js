var express = require('../node_modules/express'),
    path = require('../node_modules/path'),
    cookieParser = require('../node_modules/cookie-parser'),
    bodyParser = require('../node_modules/body-parser');
    requestProxy = require('../node_modules/request'),
    ejs = require('../node_modules/ejs');
var app = express();

// generate connection string based on env tag.
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var server_address = 'localhost'

if (env == 'development') {
    var port = 4000;
    var server_port = 3030;
}
else {
    var port = process.env.PORT;
    var server_port = process.env.SERVER_PORT;
}
var web_server_address = server_address + ":" + port;
var bl_server_address = server_address +  ":" + server_port;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/partials/:partialPath',
        function(req,res){
            res.render('partials/'+req.params.partialPath);
        });

app.all('/api/*',
    function(req,res,next){
        var url = "http://" + bl_server_address + req.url.substring(4) ;
        console.info("routing " + web_server_address + req.url + " to " +url );
        req.pipe(requestProxy(url)).pipe(res);
});

app.get('*', function(req, res){
  res.render('index');
});

//Set our static file directory to public
app.use(express.static(__dirname + '/public'));

var server = app.listen(port, function() {
	// log a message to console!
    console.error('Web application server listening on ' + web_server_address +
                  ' querying the bl server on ' + bl_server_address +' ...');
});

module.exports = app;