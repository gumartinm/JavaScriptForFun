module.exports = function() {
  var main = './src/showcase/';
  var app = main + 'app/';
  var bower = {
    json: require(process.cwd() + '/bower.json'),
    directory: process.cwd() + '/bower_components/',
    ignorePath: '../..'
  };
  var $ = {
    path: require('path')
  };

  return {
    main: main,
    jsAllFiles: [
      './src/**/*.js',
      './*.js'
    ],
    jsFilesWithoutSpecs: [
      app + '**/*.module.js',
      app + '**/*.js',
      '!' + app + '**/*.spec.js'
    ],
    jsFilesStubs: [
      main + 'stubs/**/*.js'
    ],
    index: main + 'index.html',
    jsHintConfigurationFile: $.path.join(__dirname, '.jshintrc'),
    jscsConfigurationFile: $.path.join(__dirname, '.jscsrc'),
    htmlHintConfigurationFile: $.path.join(__dirname, '.htmlhintrc'),

    karmaConf: 'karma.conf.js',

    build: {
      directory: './build/'
    },

    html: app + '**/*.html',
    templateFile: 'templates.js',

    temp: './.tmp/',

    /**
     * wiredep options for index.html
     */
    wiredepOptions: {
      // The directory of your Bower packages. default: '.bowerrc'.directory || bower_components
      bowerJson: bower.json,
      // Your bower.json file contents. default: require('./bower.json')
      directory: bower.directory,
      // string or regexp to ignore from the injected filepath
      ignorePath: bower.ignorePath,
      dependencies: true,     // default: true
      onError: function(err) {
        console.log('wiredep error: ' + err.code);
      },
      onFileUpdated: function(filePath) {
        console.log('wiredep updated file: ' + filePath);
      },
      onPathInjected: function(fileObject) {
        console.log('wiredep injected file: ' + fileObject.block);
        console.log('wiredep injected file: ' + fileObject.file);
        console.log('wiredep injected file: ' + fileObject.path);
      },
      onMainNotFound: function(pkg) {
        console.log('wiredep name of bower package without main: ' + pkg);
      }
    },

    /**
     * wiredep options for karma.conf.js
     */
    wiredepKarmaOptions: {
      // The directory of your Bower packages. default: '.bowerrc'.directory || bower_components
      bowerJson: bower.json,
      // Your bower.json file contents. default: require('./bower.json')
      directory: bower.directory,
      // string or regexp to ignore from the injected filepath
      ignorePath: bower.ignorePath,
      dependencies: true,     // default: true
      devDependencies: true, // default: false
      onError: function(err) {
        console.log('wiredep error: ' + err.code);
      },
      onFileUpdated: function(filePath) {
        console.log('wiredep updated file: ' + filePath);
      },
      onPathInjected: function(fileObject) {
        console.log('wiredep injected file: ' + fileObject.block);
        console.log('wiredep injected file: ' + fileObject.file);
        console.log('wiredep injected file: ' + fileObject.path);
      },
      onMainNotFound: function(pkg) {
        console.log('wiredep name of bower package without main: ' + pkg);
      }
    }
  };

};
