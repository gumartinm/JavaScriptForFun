'use strinct';

var currentDir = process.cwd();
var express = require('express');
var app = express();
var port = 9000;
var environment = process.env.NODE_ENV;

// Back-end server for XHR requests:
var serverPort = '8080';
var serverName = 'localhost';


switch (environment) {
  default:
    console.log('development mode');

    app.use(express.static(currentDir + '/'));

    // Deep linking (exclude XHR requests)
    app.use('/((?!api)).*', express.static(currentDir + '/src/index.html'));
    break;
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n __dirname = ' + __dirname +
    '\n process.cwd = ' + currentDir);
});
