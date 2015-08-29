'use strict';

var currentDir = process.cwd();
var $ = {
  path: require('path')
};
var pkg = require($.path.join(process.cwd(), 'package.json'));
var express = require('express');
var proxy = require('express-http-proxy');
var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = 9000;
var environment = process.env.NODE_ENV;
var verbose = process.env.VERBOSE;

// Back-end server for XHR requests:
var serverPort = '8080';
var serverName = 'localhost';

app.use(favicon(__dirname + '/favicon.ico'));
if (verbose && verbose === true) {
  app.use(logger('dev'));
}

switch (environment) {
  case 'production':
    console.log('production mode');

    app.use(express.static(currentDir + '/build/'));

    // Deep linking (exclude XHR requests)
    app.use('/((?!api)).*', express.static(currentDir + '/build/index.html'));
    break;
  case 'ngdocs':
    console.log('ngdocs mode');

    app.use(express.static(currentDir + '/docs'));

    // Deep linking
    app.use('/*', express.static(currentDir + '/docs'));
    break;
  default:
    console.log('development mode');

    app.use(express.static(currentDir + '/src/' + pkg.name + '/'));
    app.use(express.static(currentDir + '/'));

    // Deep linking (exclude XHR requests)
    app.use('/((?!api)).*', express.static(currentDir + '/src/' + pkg.name + '/index.html'));
    break;
}

app.use('/', proxy('http://' + serverName, {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  },
  port: serverPort
}));


app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n __dirname = ' + __dirname +
    '\n process.cwd = ' + currentDir);
});
