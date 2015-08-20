'use strict';

var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var config = require('./server.config')();
var port = config.port;
var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(logger('dev'));

switch (environment) {
  case 'production':
    console.log('production mode');

    app.use(express.static('./build/'));

    // Deep linking
    app.use('/*', express.static('./build/index.html'));
    break;
  default:
    console.log('development mode');

    app.use(express.static(config.main));
    app.use(express.static('./'));

    // Deep linking
    app.use('/*', express.static(config.index));
    break;
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n __dirname = ' + __dirname +
    '\n process.cwd = ' + process.cwd());
});
