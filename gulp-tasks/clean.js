const gulp = require('gulp');
const clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('_site', {read: false})
      .pipe(clean());
});
