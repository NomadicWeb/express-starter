// ====================================================
// EXPRESS
// ====================================================
var express    = require('express');
var livereload = require('express-livereload');
var app        = express();


// ====================================================
// APP CONFIG
// ====================================================
var conf       = require('./app/config/conf.js');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/app/assets/'));
app.set('views', __dirname + '/app/views');
app.set('port', conf.port);
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(err, req, res, next){res.status(err.status || 500);});


// ====================================================
// ROUTING
// ====================================================
var router = require('./app/router')(app);
module.exports = app;


// ====================================================
// SERVER
// ====================================================
livereload(app, {watchDir: process.cwd() + "/app/"});
app.listen(app.get('port'), function(){
      console.log('Listening on ' + app.get('port'));
});
