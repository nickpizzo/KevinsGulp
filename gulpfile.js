///////////////////
// REQUIRED MODULES
///////////////////

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const prefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

///////////////////////////
// HTML CSS & SCRIPTS TASKS
///////////////////////////

const sync = browserSync.create();

gulp.task('html', function () {
  gulp.src('src/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(sync.reload({
    stream: true
  }));
});

gulp.task('scripts', function () {
  gulp.src('src/*.js')
  .pipe(gulp.dest('dist'))
  .pipe(sync.reload({
    stream: true
  }));
});

gulp.task('styles', function () {
  gulp.src('src/*.{css,scss,less,sass}')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(prefix('last 2 versions')) //calls autoprefixer
    .pipe(gulp.dest('dist'))
    .pipe(sync.reload({
      stream: true
    }));
});

gulp.task('images', function () {
  gulp.src('src/images/**/*.{png,jpg,svg}')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
  .pipe(sync.reload({
    stream: true
  }));
});

////////////////////////////////////////////////////
//PIPES SRC FILES INTO DIST & WATCHES CHANGES IN SRC
///////////////////////////////////////////////////

gulp.task('build', ['html', 'scripts', 'styles', 'images']);

gulp.task('serve', ['build'], function () {
  sync.init({
    server: 'dist',
  });

  gulp.watch('src/*.{html,jade}', ['html']);
  gulp.watch('src/*.js', ['scripts']);
  gulp.watch('src/*.{css,scss,sass}', ['styles']);
  gulp.watch('src/**/*.{png,jpg,svg}', ['images']);
});

//////////////////////////////
// THE DEFAULT TASK IS "SERVE"
//////////////////////////////

gulp.task('default', ['serve']);
