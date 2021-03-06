var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

gulp.task('sass', function () {
  return gulp.src('./docs/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./docs/assets'));
});

gulp.task('sass:watch', gulp.series('sass', function () {
  gulp.watch('./docs/sass/**/*.scss', gulp.series('sass'));
}));

gulp.task('default', gulp.parallel('sass:watch'));

gulp.task('build', function() {
  gulp.src(['./docs/assets/**/*.png', './docs/assets/**/*.svg'])
    .pipe(gulp.dest('./dist/shared/images'));

  gulp.src(['./docs/liquid/**/*.liquid'])
    .pipe(replace('asset_img_url_local', 'asset_img_url'))
    .pipe(replace('asset_url_local', 'asset_img_url'))
    .pipe(gulp.dest('./dist/shopify/dist'));

  return gulp.src('./docs/sass/style.scss')
    .pipe(rename({ basename: 'buy-page-2.0'}))
    .pipe(replace(/url\(([^\)]+)\)/g, "url(#{'{{ $1 | asset_url }}'})"))
    .pipe(gulp.dest('./dist/shared/css/reskin'));
});

