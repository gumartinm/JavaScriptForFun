var args = require('yargs').argv;
var config = require('./gulp.config')();
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],                                  // the glob(s) to search for
  scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within
  replaceString: /^gulp(-|\.)/,  // what to remove from the name of the module when adding it to the context
  camelize: true,   // if true, transforms hyphenated plugins names to camel case
  lazy: true,       // whether the plugins should be lazy loaded on demand
  rename: {}        // a mapping of plugins to rename
});

/**
 * Arguments:
 *
 * --verbose  : Various tasks will produce more output to the console.
 * --stubs    : Using stubs in index.html (for mocking services, controllers or any other stuff)
 */

gulp.task('help', plugins.taskListing);

/**
 * @description
 * vet (evaluate) the code and create coverage report
 *
 * @return {Stream}
 */
gulp.task('vet', function() {

  plugins.util.log(plugins.util.colors.blue('Checking source with JSHint and JSCS'));

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

gulp.task('wiredep', function() {

  plugins.util.log('Wiring bower dependencies into html');

  var wiredep = require('wiredep').stream;
  var wiredepOptions = config.getWiredepDefaultOptions();

  var jsFiles = args.stubs ? [].concat(config.jsFilesWithoutSpecs, config.jsFilesStubs) : config.jsFilesWithoutSpecs;

  return gulp.src(config.index)
    .pipe(wiredep(wiredepOptions))
    .pipe(inject(jsFiles, ''))
    .pipe(gulp.dest(config.main));
});

/**
 * @description
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