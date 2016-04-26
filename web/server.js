var express = require('../node_modules/express'),
  path = require('../node_modules/path'),
  cookieParser = require('../node_modules/cookie-parser'),
  bodyParser = require('../node_modules/body-parser');
  ejs = require('../node_modules/ejs');
var app = express();

// generate connection string based on env tag.
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (env == 'development') {
    var port = 4000;
    var server_port = 3030;
    var server_address = 'localhost';
}
else {
    var port = process.env.PORT;
    var server_port = process.env.SERVER_PORT;
    var server_address = 'localhost';
}

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
app.get('/bl_server_address', function(req, res){
    res.send({"bl_server_address":"http://" + server_address+":"+server_port});
});

app.get('*', function(req, res){
  res.render('index');
});

//Set our static file directory to public
app.use(express.static(__dirname + '/public'));

var server = app.listen(port, function() {
	// log a message to console!
    console.error('Web application server listening on port ' + port +
                  ' querying the bl server on ' + server_port +' ...');
});

module.exports = app;