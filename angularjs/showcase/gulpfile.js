var args = require('yargs').argv;
var config = require('./gulp.config')();
var serverConfig = require('./server/server.config')();
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: true});

/**
 * Arguments:
 *
 * --verbose  : Various tasks will produce more output to the console.
 * --stubs    : Using stubs in index.html (for mocking services, controllers or any other stuff)
 */


/**
 * Default tasks
 *
 */
gulp.task('help', plugins.taskListing);
gulp.task('default', ['help']);


/**
 * vet (evaluate) the code and create coverage report.
 *
 * @return {Stream}
 */
gulp.task('vet', function() {

  log('Checking source files with JSHint and JSCS');

  return gulp.src(config.jsAllFiles)
    .pipe(plugins.if(args.verbose, plugins.print()))
    .pipe(plugins.jshint(config.jshintConfigurationFile))
    .pipe(plugins.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe(plugins.jshint.reporter('fail'))
    .pipe(plugins.jscs({
      configPath: config.jscsConfigurationFile,
      fix: false
    }));
});

/**
 * wire up bower dependencies and inject files in index.html
 *
 * @return {Stream}
 */
gulp.task('wiredep', function() {

  log('Wiring bower dependencies into html');

  var wiredep = require('wiredep').stream;
  var wiredepOptions = config.getWiredepOptions();

  var jsFiles = args.stubs ? [].concat(config.jsFilesWithoutSpecs, config.jsFilesStubs) : config.jsFilesWithoutSpecs;

  return gulp.src(config.index)
    .pipe(wiredep(wiredepOptions))
    .pipe(inject(jsFiles, ''))
    .pipe(gulp.dest(config.main));
});

/**
 * Runs HTTP server in development mode.
 */
gulp.task('server-dev', ['wiredep'], function() {
  log('Starting server in development mode');

  server(true);
});

/**
 * Inject files in a sorted sequence at a specified inject label.
 *
 * @param {Array} source Source files (glob patterns)
 * @param {string=} label The label name to be used by gulp-inject.
 * @returns {Stream} The stream.
 */
function inject(source, label) {
  var options = {relative: false};
  if (label) {
    options.name = 'inject:' + label;
  }

  return plugins.inject(
    gulp.src(source)
      .pipe(plugins.angularFilesort(), options));
}

/**
 * Runs HTTP server.
 *
 * @param  {boolean} isDev - development or build mode.
 */
function server(isDev) {
  var nodeOptions = {
    script: serverConfig.script,
    delayTime: 1,
    env: {
      'NODE_ENV': isDev ? 'dev' : 'build'
    },
    watch: [serverConfig.directory]
  };

  return plugins.nodemon(nodeOptions)
    .on('restart', ['vet'], function(ev) {
      log('HTTP server restarted');
      log('files changed:\n' + ev);
    })
    .on('start', function () {
      log('HTTP server started');
    })
    .on('crash', function () {
      log('HTTP server crashed');
    })
    .on('exit', function () {
      log('HTTP server exited');
    });
}

function log(message) {
  plugins.util.log(plugins.util.colors.blue(message));
}