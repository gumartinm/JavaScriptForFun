module.exports = function() {

  var config = {
    javaScriptFiles: [
        './src/**/*.js',
        './*.js'
    ],
    jshintConfigurationFile: '.jshintrc',
    jscsConfigurationFile: '.jscsrc'
  };

  config.getWiredepDefaultOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };


  return config;
};
