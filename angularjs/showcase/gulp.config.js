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
    jsFilesStubs: [
      bower.directory + 'angular-mocks/angular-mocks.js',
      main + 'stubs/**/*.js'
    ],
    index: main + 'index.html',
    jshintConfigurationFile: '.jshintrc',
    jscsConfigurationFile: '.jscsrc'
  };

  config.getWiredepDefaultOptions = function() {
    return {
      // The directory of your Bower packages. default: '.bowerrc'.directory || bower_components
      bowerJson: bower.json,
      // Your bower.json file contents. default: require('./bower.json')
      directory: bower.directory,
      // string or regexp to ignore from the injected filepath
      ignorePath: bower.ignorePath,
      dependencies: true,     // default: true
      devDependencies: false, // default: false
      includeSelf: false      // default: false
    };
  };

  return config;
};
