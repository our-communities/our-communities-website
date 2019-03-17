const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

// Minify HTML
gulp.task('html', function() {
    gulp.src('./_site/index.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('./_site'));
    gulp.src('./_site/*/*html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('./_site/./'));
});
