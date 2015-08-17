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

  return gulp.src(config.javaScriptFiles)
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

  plugins.util.log('Wiring the bower dependencies into the html');

  var wiredep = require('wiredep').stream;
  var options = config.getWiredepDefaultOptions();

  // Only include stubs if flag is enabled
  var js = args.stubs ? [].concat(config.js, config.stubsjs) : config.js;

  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe(inject(js, '', config.jsOrder))
    .pipe(gulp.dest(config.client));
});
