var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');



var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./js/**/*.js'],
  static: ['./static/**/*.*', './js/**/*.html'],
  lib: ['./bower_components/**/*.*']
};

gulp.task('default', ['build']);

gulp.task('serve', ['build'], shell.task([
  'ionic serve'
]));

gulp.task('build', ['browserify', 'copy-lib', 'sass', 'copy-static'], shell.task([
  'ionic config build'
]));

gulp.task('dev', ['build', 'watch']);

gulp.task('sass', function() {
  return gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'));
});

gulp.task('browserify', function () {
  var b = browserify({
    entries: './js/app.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('./js/app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./www'));
});

gulp.task('copy-static', function(){
  return gulp.src(paths.static)
  .pipe(gulp.dest('./www'));
});

gulp.task('copy-lib', function(){
  return gulp.src(paths.lib)
  .pipe(gulp.dest('./www/lib'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['browserify']);
  gulp.watch(paths.static, ['copy-static']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
