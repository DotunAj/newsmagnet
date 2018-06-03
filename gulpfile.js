const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const connect = require('gulp-connect');


// build server
gulp.task('connect', ()=>{
    connect.server({
        root: 'build',
        livereload: true
    });
});

//copy html and css

gulp.task('html', () =>{
    gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

gulp.task('css', () =>{
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('build/css'))
        .pipe(connect.reload());
});

// es6 to es5

gulp.task('scripts', () => {
    gulp.src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("main.js"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/js'))
        .pipe(connect.reload());
});

gulp.task('watch', ()=>{
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/js/*.js', ['scripts']);
})

gulp.task('default', ['connect', 'watch']);