var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/assets'));
});

gulp.task('sass:watch', gulp.series('sass', function () {
  gulp.watch('./app/sass/**/*.scss', gulp.series('sass'));
}));

gulp.task('default', gulp.parallel('sass:watch'));
