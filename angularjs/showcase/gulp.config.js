module.exports = function() {
  var main = './src/showcase/';
  var app = main + 'app/';
  var bower = {
    json: require('./bower.json'),
    directory: './bower_components/',
    ignorePath: '../..'
  };
  var config = {
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
    jsFilesWithSpecs: [
      app + '**/*.module.js',
      app + '**/*.js'
    ],
    jsFilesStubs: [
      main + 'stubs/**/*.js'
    ],
    index: main + 'index.html',
    jshintConfigurationFile: '.jshintrc',
    jscsConfigurationFile: '.jscsrc',

    karmaConf: 'karma.conf.js'
  };

  config.getWiredepOptions = function() {
    return {
      // The directory of your Bower packages. default: '.bowerrc'.directory || bower_components
      bowerJson: bower.json,
      // Your bower.json file contents. default: require('./bower.json')
      directory: bower.directory,
      // string or regexp to ignore from the injected filepath
      ignorePath: bower.ignorePath,
      dependencies: true     // default: true
    };
  };

  config.getWiredepKarmaOptions = function() {
    return {
      // The directory of your Bower packages. default: '.bowerrc'.directory || bower_components
      bowerJson: bower.json,
      // Your bower.json file contents. default: require('./bower.json')
      directory: bower.directory,
      // string or regexp to ignore from the injected filepath
      ignorePath: bower.ignorePath,
      dependencies: true,     // default: true
      devDependencies: true // default: false
    };
  };

  return config;
};
