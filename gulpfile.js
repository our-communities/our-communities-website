'use strict';
const dotenv = require('dotenv').config();

// Are we in a production environment?
const isProduction = process.env.CONTEXT ? true : false;
console.log('-----IS PRODUCTION-----' + isProduction);

// Gulp and node
const gulp = require('gulp');
const cp = require('child_process');
const browserSync = require('browser-sync');
const runSequence = require('run-sequence');

// Helpers
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
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
    return cp.spawn( 'bundle' , ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
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

gulp.task('deploy', ['jekyll-build'], function () {
    return gulp.src('./_site/**/*')
        .pipe(deploy());
});

// Rebuild Jekyll & do page reload
gulp.task('rebuild', ['jekyll-build-incremental'], function (done) {
    browserSync.reload();
    done();
});

// Serve after jekyll-build
gulp.task('browser-sync', ['build-site'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

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

gulp.task('deploy', ['create-files']);

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('build', ['sass', 'js', 'create-files', 'jekyll-build', 'img']);
