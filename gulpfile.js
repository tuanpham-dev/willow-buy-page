var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/assets'));
});

gulp.task('sass:watch', gulp.series('sass', function () {
  gulp.watch('./app/sass/**/*.scss', gulp.series('sass'));
}));

gulp.task('default', gulp.parallel('sass:watch'));

gulp.task('build', function() {
  gulp.src(['./app/assets/**/*.png', './app/assets/**/*.svg'])
    .pipe(gulp.dest('./dist/shared/images'));

  gulp.src(['./app/liquid/**/*.liquid'])
    .pipe(replace('asset_img_url2', 'asset_img_url'))
    .pipe(gulp.dest('./dist/shopify/dist'));

  return gulp.src('./app/sass/style.scss')
    .pipe(replace(/url\(([^)]*)\)/, "url(#{'{{ $1 | asset_url }}'})"))
    .pipe(rename({ basename: 'buy-page-2.0'}))
    .pipe(gulp.dest('./dist/shared/css/reskin'));
});

