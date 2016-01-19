var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var HttpError = require('./error').HttpError;
var mongoose = require('mongoose');
var log = require('./libs/log')(module);
var errorHandler = require('express-error-handler');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

require('./routes')(app);

app.use(require('./middleware/sendHttpError'));
app.use(errorHandler());
app.use(express.Router());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/build')));

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  if (typeof err == 'number') {
    err = new HttpError(err);
  }
  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    if (app.get('env') == 'development') {
      errorHandler()(err, req, res, next);
    } else {
      log.error(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});

module.exports = app;