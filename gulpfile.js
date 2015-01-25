var gulp            = require('gulp'); 
var concat          = require('gulp-concat');
var mainBowerFiles  = require('main-bower-files');
var uglify          = require('gulp-uglify');
var minifycss       = require('gulp-minify-css');
var gulpMerge       = require('gulp-merge');
var less            = require('gulp-less');
var debug           = require('gulp-debug');

var paths = {
  bower_js: mainBowerFiles({filter:'**/*.js'}),
  js: [
       'bower_components/socket.io-client/socket.io.js',
       'scripts/**/*.js'
      ],
  css: mainBowerFiles({filter:'**/*.css'}),
  less: 'less/*.less',
  fonts: 'bower_components/foundation-icon-fonts/*.{eot,woff,ttf,svg}',
  html: 'www/**.html',
  build: 'www/**'
};
paths.js = paths.bower_js.concat(paths.js);

gulp.task('scripts', function() {
  return gulp.src(paths.js)
    .pipe(concat('script.js'))
    .pipe(debug({title: 'scripts'}))
    //.pipe(uglify())
    .pipe(gulp.dest('www/'));
});

gulp.task('style', function() {
  return gulpMerge(
      gulp.src(paths.css),
      gulp.src(paths.less)
        .pipe(debug({title: 'less'}))
        .pipe(less())
    )
    .pipe(debug({title: 'css'}))
    .pipe(concat('style.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('www/'));
});

gulp.task('fonts',function() {
  return gulp.src(paths.fonts)
    //.pipe(debug())
    .pipe(gulp.dest('www'));
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch(paths.js, ['scripts']);
  gulp.watch(paths.css, ['style']);
  gulp.watch(paths.less, ['style']);
  gulp.watch('gulpfile.js', ['default']);
});

gulp.task('default', ['scripts','style','fonts','watch']);

// Try: gulp-livereload & tiny-lr