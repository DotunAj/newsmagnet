const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js')
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
var webserver = require('gulp-webserver');


gulp.task('connect', function() {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

//copy html and css

gulp.task('html', () =>{
    gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
});

gulp.task('css', () =>{
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('build/css'))
});

// es6 to es5

gulp.task('scripts', () => {
    gulp.src('src/js/index.js')
        .pipe(babel())
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulp.dest('build/js'))
});

gulp.task('sw', () => {
    gulp.src('src/js/sw.js')
        .pipe(babel())
        .pipe(gulp.dest('build'))
});



gulp.task('watch', () => {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/js/*.js', ['scripts', 'sw']);
})

gulp.task('default', ['connect','html','css', 'scripts', 'sw', 'watch']);