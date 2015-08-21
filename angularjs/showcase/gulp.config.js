module.exports = function() {
  var main = './src/showcase/';
  var app = main + 'app/';
  var bower = {
    json: require('./bower.json'),
    directory: './bower_components/',
    ignorePath: '../..'
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
    jsHintConfigurationFile: '.jshintrc',
    jscsConfigurationFile: '.jscsrc',
    htmlHintConfigurationFile: '.jshintrc',

    karmaConf: 'karma.conf.js',

    build: {
      directory: './build/'
    },

    html: app + '**/*.html',
    templateFile: 'templates.js',

    temp: './.tmp/',

    /**
     * wiredep options for index.html and karma.conf.js
     */
    wiredepOptions: {
      // The directory of your Bower packages. default: '.bowerrc'.directory || bower_components
      bowerJson: bower.json,
      // Your bower.json file contents. default: require('./bower.json')
      directory: bower.directory,
      // string or regexp to ignore from the injected filepath
      ignorePath: bower.ignorePath,
      dependencies: true     // default: true
    },
    wiredepKarmaOptions: {
      // The directory of your Bower packages. default: '.bowerrc'.directory || bower_components
      bowerJson: bower.json,
      // Your bower.json file contents. default: require('./bower.json')
      directory: bower.directory,
      // string or regexp to ignore from the injected filepath
      ignorePath: bower.ignorePath,
      dependencies: true,     // default: true
      devDependencies: true // default: false
    }
  };

};
