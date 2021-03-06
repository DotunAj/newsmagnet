const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js')
const sourcemaps = require('gulp-sourcemaps');
//const concat = require('gulp-concat');
const babel = require('gulp-babel');
var webserver = require('gulp-webserver');


gulp.task('connect', function() {
  gulp.src('docs')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

//copy html and css

gulp.task('html', () =>{
    gulp.src('src/*.html')
        .pipe(gulp.dest('docs'))
});

gulp.task('css', () =>{
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('docs/css'))
});

// es6 to es5

gulp.task('scripts', () => {
    gulp.src('src/js/index.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('docs/js'))
});

gulp.task('sw', () => {
    gulp.src('src/js/sw.js')
        .pipe(babel())
        .pipe(gulp.dest('docs'))
});

gulp.task('watch', () => {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/js/index.js', ['scripts']);
    gulp.watch('src/js/sw.js', ['sw']);
})

gulp.task('default', ['connect','html','css', 'scripts', 'sw', 'watch']);