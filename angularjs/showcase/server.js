var express = require('express');
var proxy = require('express-http-proxy');
var app = express();

// URL to backend server
var moduleName = process.env.npm_package_config_backend_server_url;

// Backend server port:
var serverPort = process.env.npm_package_config_backend_port;

// Backend server name:
var serverName = process.env.npm_package_config_backend_server_name;


app.use('/', express.static('app'));
app.use('/' + moduleName, proxy('http://' + serverName, {
  forwardPath: function(req, res) {
    return require('url').parse('/' + moduleName + req.url).path;
  },
  port: serverPort
}));

 
app.listen(process.env.npm_package_config_express_port);
