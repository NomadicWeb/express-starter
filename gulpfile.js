var gulp   = require('gulp'),
    stylus = require('gulp-stylus'),
    axis   = require('axis'),
    nmon   = require('gulp-nodemon'),
    minCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('stylus', function(){
  gulp.src('./app/assets/stylesheets/style.styl')
  .pipe(stylus({use: [axis()]}))
  .pipe(minCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./app/assets/stylesheets/dist'));
});

gulp.task('concat-css', function(){
  gulp.src([
    './app/assets/stylesheets/dist/style.min.css',
    './app/assets/bower/bootstrap/dist/css/bootstrap.min.css'
  ])
   .pipe(concat('concat.css', {newLine: ';'}))
   .pipe(gulp.dest('./app/assets/stylesheets/dist'));
});

gulp.task('concat-js', function(){
  gulp.src([
    './app/assets/bower/jquery/dist/jquery.min.js',
    './app/assets/javascripts/dist/app.min.js'
  ])
   .pipe(concat('concat.js', {newLine: ';'}))
   .pipe(gulp.dest('./app/assets/javascripts/dist'));
});

gulp.task('uglify', function(){
  gulp.src('./app/assets/javascripts/*.js')
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./app/assets/javascripts/dist'));
});

gulp.task('watch', function(){
    gulp.watch("./app/assets/stylesheets/*.styl", ['stylus', 'concat-css']);
    gulp.watch("./app/assets/javascripts/*.js",   ['uglify', 'concat-js']);
});

gulp.task('dev', function(){
  nmon({script: 'server.js'});
});

gulp.task('default', ['dev', 'watch']);
