var gulp          = require('gulp');
var sass          = require('gulp-sass');
var concat        = require('gulp-concat');
var browserSync   = require('browser-sync').create();

var cssFiles = './scss/*';

var interceptErrors = function(error) {
    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};

gulp.task('sass', function () {
	return gulp.src(cssFiles)
        .pipe(sass({errLogToConsole: true,outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./'))
});

gulp.task('default', ['sass'], function() {

    browserSync.init(['./**.**'], {
        server: "./",
        port: 3000,
        notify: false
    });

    gulp.watch(cssFiles, ['sass']);
});
