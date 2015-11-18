///////////////////
// REQUIRED MODULES
///////////////////

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');


///////////////////////////
// HTML CSS & SCRIPTS TASKS
///////////////////////////

const sync = browserSync.create();

gulp.task('html', () => {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(sync.reload({
      stream: true
    }));
});

gulp.task('styles', function () {
  gulp.src('src/*.{scss,less,sass}')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('dist'))
    .pipe(sync.reload({
    stream: true
  }));
});

////////////////////////////////////////////////////
//PIPES SRC FILES INTO DIST & WATCHES CHANGES IN SRC
///////////////////////////////////////////////////

gulp.task('build', ['styles', 'html']);

gulp.task('serve', ['build'], function () {
  sync.init({
    server: 'dist',
  });

  gulp.watch('src/*.{html,jade}', ['html']);
  gulp.watch('src/*.{css,scss,sass}', ['styles']);
});

//////////////////////////////
// THE DEFAULT TASK IS "SERVE"
//////////////////////////////

gulp.task('default', ['serve']);
