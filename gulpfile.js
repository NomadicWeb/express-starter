var gulp   = require('gulp'),
    stylus = require('gulp-stylus'),
    axis   = require('axis'),
    nmon   = require('gulp-nodemon'),
    minCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),

gulp.task('stylus', function () {
  gulp.src([
    './app/assets/stylesheets/style.styl',
    './app/assets/bower/bootstrap/dist/css/bootstrap.min.css',
  ])
  .pipe(stylus({use: [axis()]}))
  .pipe(minCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./app/assets/stylesheets/dist'));
});

gulp.task('uglify', function () {
  gulp.src('./app/assets/javascripts/*.js')
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./app/assets/javascripts/dist'));
});

gulp.task('watch', function(){
    gulp.watch("./app/assets/stylesheets/*.styl", ['stylus']);
    gulp.watch("./app/assets/javascripts/*.js",   ['uglify']);
});

gulp.task('dev', function() {
  nmon({script: 'server.js'});
});

gulp.task('default', ['dev', 'watch']);
