var express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser');

var app = express();
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/partials/:partialPath',
        function(req,res){
            res.render('partials/'+req.params.partialPath);
        });
app.get('*', function(req, res){
  res.render('index')
});

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Set our static file directory to public
app.use(express.static(__dirname + '/public'));

// generate connection string based on env tag.
if (env == 'development') {
    var port = 4000;
}
else {
    var port = process.env.WEB_PORT;
}
app.set('port', port);
var server = app.listen(app.get('port'), function() {
	// log a message to console!
    console.error('Port at ' + app.get('port'));
});

module.exports = app;