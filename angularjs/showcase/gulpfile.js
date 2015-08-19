var args = require('yargs').argv;
var config = require('./gulp.config')();
var serverConfig = require('./server/server.config')();
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: true});

/**
 * Arguments:
 *
 * [--verbose]  : Various tasks will produce more output to the console. No verbose by default.
 * [--stubs]    : Using stubs in index.html (for mocking services, controllers or any other stuff) No stubs by default.
 * [--environment]  : Running tasks in integration or development environment. Development by default.
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
  var jsFiles = args.stubs ? [].concat(config.jsFilesWithoutSpecs, config.jsFilesStubs) : config.jsFilesWithoutSpecs;

  return gulp.src(config.index)
    .pipe(wiredep(config.getWiredepOptions()))
    .pipe(inject(jsFiles, ''))
    .pipe(gulp.dest(config.main));
});

/**
 * Runs HTTP server.
 */
gulp.task('server', ['wiredep'], function(done) {
  var environment = 'development';

  if (args.environment) {
    environment = args.environment;
  }

  log('Starting server in ' + environment + ' mode');
  server(environment);
  done();
});

/**
 * Runs specs once and exit.
 *
 * @return {Stream}
 */
gulp.task('test', ['vet'], function(done) {
  startTests(true, done);
});

/**
 * Run specs and wait. Watch for file changes and re-run tests on each change
 */
gulp.task('autotest', function(done) {
  startTests(false, done);
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
 * @param  {string=} [environment='development'] development or integration environments.
 */
function server(environment) {
  var nodeOptions = {
    script: serverConfig.script,
    delayTime: 1,
    env: {
      'NODE_ENV': environment ? environment : 'development'
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

/**
 * Tests runner, karma launcher.
 *
 * @param  {boolean} singleRun True means run once and end (continuous integration), or keep running (development)
 * @param  {function} done Callback to fire when karma is done
 * @return {undefined}
 */
function startTests(singleRun, done) {
  var excludeFiles = [];
  var karma = require('karma').server;

  karma.start({
    configFile: __dirname + '/karma.conf.js',
    exclude: excludeFiles,
    singleRun: singleRun
  }, doneKarma);

  function doneKarma(result) {
    log('Karma completed');
    log('Karma: tests exited with code ' + result);
    done();
  }
}

function log(message) {
  plugins.util.log(plugins.util.colors.blue(message));
}
