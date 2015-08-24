'use strict';

var currentDir = process.cwd();
var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = 9000;
var environment = process.env.NODE_ENV;
var verbose = process.env.VERBOSE;

app.use(favicon(__dirname + '/favicon.ico'));
if (verbose && verbose === true) {
  app.use(logger('dev'));
}

switch (environment) {
  case 'production':
    console.log('production mode');

    app.use(express.static(currentDir + '/build/'));

    // Deep linking
    app.use('/*', express.static(currentDir + '/build/index.html'));
    break;
  case 'ngdocs':
    console.log('ngdocs mode');

    app.use(express.static(currentDir + '/docs'));

    // Deep linking
    app.use('/*', express.static(currentDir + '/docs'));
    break;
  default:
    console.log('development mode');

    app.use(express.static(currentDir + '/src/showcase/'));
    app.use(express.static(currentDir + '/'));

    // Deep linking
    app.use('/*', express.static(currentDir + '/src/showcase/index.html'));
    break;
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n __dirname = ' + __dirname +
    '\n process.cwd = ' + currentDir);
});
