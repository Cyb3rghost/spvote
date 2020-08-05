var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inscriptionRouter = require('./routes/inscription');
var registerRouter = require('./routes/register');
var connexionRouter = require('./routes/connexion');
var connectRouter = require('./routes/connect');
var logoutRouter = require('./routes/logout');
var sujetRouter = require('./routes/sujet');
var publicationRouter = require('./routes/publication');
var participationRouter = require('./routes/participation');
var visualisationRouter = require('./routes/visualisation');
var voteRouter = require('./routes/vote');
var mesSujetsRouter = require('./routes/messujets');
var mesParticipationsRouter = require('./routes/mesparticipations');
var enCoursRouter = require('./routes/encours');
var terminerRouter = require('./routes/terminer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

var requiresLogin = function(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    /*var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);*/
    res.send('You must be logged in to view this page.')
  }
}

/**
 * @MidleWare
 * Flash Messages
 */
app.use('/*', function (req, res, next) {
  res.locals.msgFlash = {}
  if (req.session.msgFlash) {
    res.locals.msgFlash = req.session.msgFlash
    req.session.msgFlash = null
  }
  next()
})

app.use('/', indexRouter);
app.use('/inscription', inscriptionRouter);
app.use('/register', registerRouter);
app.use('/connexion', connexionRouter);
app.use('/connect', connectRouter);
app.use('/logout', logoutRouter);
app.use('/sujet', requiresLogin, sujetRouter);
app.use('/publication', requiresLogin, publicationRouter);
app.use('/participation', requiresLogin, participationRouter);
app.use('/visualisation', requiresLogin, visualisationRouter);
app.use('/vote', requiresLogin, voteRouter);
app.use('/mes-sujets', requiresLogin, mesSujetsRouter);
app.use('/mes-participations', requiresLogin, mesParticipationsRouter);
app.use('/en-cours', requiresLogin, enCoursRouter);
app.use('/terminer', requiresLogin, terminerRouter);

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
