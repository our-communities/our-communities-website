'use strict';
const dotenv = require('dotenv').config();

const isProduction = process.env.CONTEXT ? true : false;
const locale = process.env.LOCATION;
console.log('-----IS PRODUCTION-----' + isProduction);

// Gulp and node
const gulp = require('gulp');
const cp = require('child_process');
const browserSync = require('browser-sync');
const runSequence = require('gulp4-run-sequence');

// Helpers
const messages = {
    jekyllBuild: '<span style="color: green">Running:</span> $ jekyll build'
};

// Get any external tasks
require('require-dir')('gulp-tasks');

gulp.task('watch', function() {
  gulp.watch('_sass/**/*.scss', ['sass', 'jekyll-build']);
  gulp.watch(['*.html', '*.md', '_layouts/*.html', '_includes/*.html', '_events/*.md', '_communities/*.md',  'pages_/*.md', '_include/*html'], ['rebuild']);
  gulp.watch('_js/scripts.js', ['js']);
  gulp.watch('_img/*.jpg', ['img']);
});

gulp.task('default', function(cb) {
  runSequence(
    'browser-sync', 'watch',
    cb);
  }
);

// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( 'bundle' , ['exec', 'jekyll', 'build','--config', `_config.yml,_config-${locale}.yml`, '--verbose'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-build-incremental', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( 'bundle' , ['exec', 'jekyll', 'build', '--incremental'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-serve', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn( 'bundle' , ['exec', 'jekyll', 'serve', '--config', '_config.yml', '--incremental'], {stdio: 'inherit'})
      .on('close', done);
});

gulp.task('deploy', gulp.series('jekyll-build', function () {
    return gulp.src('./_site/**/*')
        .pipe(deploy());
}));

// Rebuild Jekyll & do page reload
gulp.task('rebuild', gulp.series('jekyll-build-incremental', function (done) {
    browserSync.reload();
    done();
}));



gulp.task('build-site', function(cb) {
  runSequence(
    'clean',
    ['sass', 'js', 'jquery'],
    'mc-js',
    ['img', 'post-img', 'header-img', 'icons', 'img-misc'],
    'create-files',
    'jekyll-build',
    cb);
});

gulp.task('deploy', gulp.series('create-files'));

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

// Serve after jekyll-build
gulp.task('browser-sync', gulp.series('build-site', function() {
  browserSync({
      server: {
          baseDir: '_site'
      }
  });
}));

gulp.task('build', gulp.series('sass', 'js', 'create-files', 'jekyll-build', 'img'));
