var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: true});
var serverConfig = require('./server/server.config')();

/**
 * Arguments:
 *
 * [--verbose]  : Various tasks will produce more output to the console. No verbose by default.
 * [--stubs]    : Using stubs in index.html (for mocking services, controllers or any other stuff) No stubs by default.
 * [--environment production|development]  : Running tasks in production or development environment.
 * Development by default.
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
 * @return {stream}
 */
gulp.task('vet', function() {

  log('*** Checking source files with JSHint and JSCS ***');

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

  log('*** Wiring bower dependencies into html ***');

  var wiredep = require('wiredep').stream;
  var jsFiles = args.stubs ? [].concat(config.jsFilesWithoutSpecs, config.jsFilesStubs) : config.jsFilesWithoutSpecs;

  return gulp.src(config.index)
    .pipe(wiredep(config.wiredepOptions))
    .pipe(inject(jsFiles, ''))
    .pipe(gulp.dest(config.main));
});

/**
 * wire up bower dependencies and inject files in karma.conf.js
 *
 * @return {Stream}
 */
gulp.task('wiredepkarma', function() {

  log('*** Wiring bower dependencies into karma.conf.js ***');

  var wiredep = require('wiredep').stream;

  return gulp.src(config.karmaConf)
    .pipe(wiredep(config.wiredepKarmaOptions))
    .pipe(gulp.dest(__dirname));
});

/**
 * Runs HTTP server.
 */
gulp.task('server', ['wiredep'], function(done) {
  var environment = 'development';

  if (args.environment) {
    environment = args.environment;
  }

  log('*** Starting server in ' + environment + ' mode ***');

  server(environment);
  done();
});

/**
 * Runs specs once and exit.
 *
 * @return {Stream}
 */
gulp.task('test', ['vet', 'wiredepkarma'], function(done) {

  log('*** Run tests once ***');

  startTests(true, done);
});

/**
 * Run specs and wait. Watch for file changes and re-run tests on each change
 */
gulp.task('autotest', ['wiredepkarma'], function(done) {

  log('*** Run tests and wait ***');

  startTests(false, done);
});

/**
 * Builds application for production.
 *
 * @return {stream} The stream.
 */
gulp.task('build', ['wiredep', 'test', 'templatecache'], function() {

  log('*** Building application for production - Optimizing assets - HTML,CSS,JS ***');

  var assets = plugins.useref.assets({searchPath: './'});
  // Filters are named for the gulp-useref path
  var cssFilter = plugins.filter('**/*.css', {restore: true});
  var jsAppFilter = plugins.filter('**/app.min.js', {restore: true});
  var jslibFilter = plugins.filter('**/lib.min.js', {restore: true});
  var templateCache = config.temp + config.templateFile;

  return gulp.src(config.index)

    // Inject templates
    .pipe(inject(templateCache, 'templates'))

    // Gather all assets from the html with useref
    .pipe(assets)

    // Get the css
    .pipe(cssFilter)
    .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
    .pipe(plugins.minifyCss())
    .pipe(plugins.if(args.verbose, plugins.bytediff.stop(byteDiffFormat)))
    .pipe(cssFilter.restore)

    // Get the custom javascript
    .pipe(jsAppFilter)
    .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
    .pipe(plugins.ngAnnotate({
      //jscs:disable
      single_quotes: true, // jshint ignore:line
      //jscs:enable
      add: true
    }))
    .pipe(plugins.uglify({
      compress: {
        //jscs:disable
        drop_console: true, // jshint ignore:line
        drop_debugger: true // jshint ignore:line
        //jscs:enable
      },
      output: {
        //jscs:disable
        quote_style: 3 // jshint ignore:line
        //jscs:enable
      }
    }))
    .pipe(plugins.if(args.verbose, plugins.bytediff.stop(byteDiffFormat)))
    .pipe(getHeader())
    .pipe(jsAppFilter.restore)

    // Get the vendor javascript
    .pipe(jslibFilter)
    .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
    .pipe(plugins.uglify({
      output: {
        //jscs:disable
        quote_style: 3 // jshint ignore:line
        //jscs:enable
      }
    }))
    .pipe(plugins.if(args.verbose, plugins.bytediff.stop(byteDiffFormat)))
    .pipe(jslibFilter.restore)

    // Take inventory of the file names for future rev numbers
    .pipe(plugins.rev())

    // Apply the concat and file replacement with useref
    .pipe(assets.restore())
    .pipe(plugins.useref())

    // Replace the file names in the html with rev numbers
    .pipe(plugins.revReplace())

    // Output to destination
    .pipe(gulp.dest(config.build.directory));

  /**
   * Format and return the header for files
   *
   * @return {stream} The stream.
   */
  function getHeader() {
    var pkg = require('./package.json');
    var banner = ['/**',
      ' * <%= pkg.name %> - <%= pkg.description %>',
      ' * @author <%= pkg.author.name %>',
      ' * @email <%= pkg.author.email %>',
      ' * @url <%= pkg.author.url %>',
      ' * @version <%= pkg.version %>',
      ' * @link <%= pkg.homepage %>',
      ' * @license <%= pkg.license %>',
      ' */',
      ''
    ].join('\n');
    return plugins.header(banner, {pkg: pkg});
  }

});

/**
 * Cleans up files in distribution directory.
 *
 * @return {undefined}
 */
gulp.task('clean', function(done) {

  log('*** Cleans up directories ***');

  del.sync([config.build.directory + '/**/*', config.temp]);
  done();
});

/**
 * Creates $templateCache from html templates
 *
 * @return {stream}
 */
gulp.task('templatecache', ['clean'], function() {

  log('*** Creating AngularJS $templateCache ***');

  return gulp
    .src(config.templates)
    .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
    .pipe(plugins.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(plugins.if(args.verbose, plugins.bytediff.stop(byteDiffFormat)))
    .pipe(plugins.angularTemplatecache(config.templateFile, {
        module: 'app.core',
        root: 'app/',
        standalone: false
      }
    ))
    .pipe(gulp.dest(config.temp));
});

/**
 * Inject files in a sorted sequence at a specified inject label.
 *
 * @param {Array|string} source Source files (glob patterns)
 * @param {string=} label The label name to be used by gulp-inject.
 * @return {stream} The stream.
 */
function inject(source, label) {
  var options = {relative: false};
  if (label) {
    options.name = 'inject:' + label;
  }

  return plugins.inject(
    gulp.src(source)
      .pipe(plugins.angularFilesort()), options);
}

/**
 * Runs HTTP server.
 *
 * @param  {string=} [environment='development'] development or production environments.
 * @return {undefined}
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
  var Server = require('karma').Server;
  var karma = new Server({
    configFile: __dirname + '/karma.conf.js',
    exclude: excludeFiles,
    singleRun: singleRun
  }, doneKarma);

  karma.start();

  function doneKarma(result) {
    log('Karma completed');
    log('Karma: tests exited with code ' + result);
    done();
  }
}

function log(message) {
  plugins.util.log(plugins.util.colors.blue(message));
}

function byteDiffFormat(data) {
  var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
  return data.fileName + ' is ' + data.percent + '%' + difference;
}
