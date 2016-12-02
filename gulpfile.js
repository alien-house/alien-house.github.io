var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');

var config = {
  entryFile: './src/jsx/app.jsx',
  destDir: './js/',
  destFile: 'app.js',
};

//Browserify
gulp.task('browserify', function() {
  browserify(config.entryFile, {debug: true})
    .transform(babelify)
    .bundle()
    .on("error", function (err) {console.log("ERROR: " + err.message);})
    .pipe(source(config.destFile))
    .pipe(gulp.dest(config.destDir))
});

//Watch Task
gulp.task('watch', function() {
  gulp.watch(config.entryFile, ['browserify'])
});

//WebServer
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({livereload: true}));
});

gulp.task('default', ['browserify', 'watch', 'webserver']);
