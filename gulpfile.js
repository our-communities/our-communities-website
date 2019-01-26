'use strict';

// Gulp and node
const gulp = require('gulp');
const cp = require('child_process');
const notify = require('gulp-notify');
const size = require('gulp-size');

// Basic workflow plugins
const browserSync = require('browser-sync');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Performance workflow plugins
const htmlmin = require('gulp-htmlmin');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const critical = require('critical');
const sw = require('sw-precache');

// Image Generation
const responsive = require('gulp-responsive');
const $ = require('gulp-load-plugins')();
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

const request = require('request');
var fs = require('fs');
var gutil = require('gulp-util');
const runSequence = require('run-sequence');


const src = {
  css: '_sass/main.scss',
  js: '_js/scripts.js',
};
const dist = {
  css: '_site/assets/css',
  js: '_site/assets/js',
};

var isProduction = false;
if (gutil.env.NODE_ENV === 'production'){
  isProduction = true;
}
console.log('-----IS PRODUCTION----' + isProduction);

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

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
gulp.task('browser-sync', ['sass', 'js', 'sw', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('build-site', function(cb) {
  runSequence(
    'clean',
    ['sass', 'js', 'sw'],
    'markdown',
    'jekyll-build',
    cb);
});

// SASS
gulp.task('sass', function() {
  return gulp.src(src.css)
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['scss'],
      onError: browserSync.notify
    }).on('error', sass.logError))
    .pipe(prefix())
    .pipe(rename({ basename: 'main' }))
    .pipe(gulp.dest(dist.css))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets/css'));
});

//  JS
gulp.task('js', function() {
  return browserify(src.js, {debug: true, extensions: ['es6']})
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(size())
    .pipe(gulp.dest(dist.js))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('critical', function (cb) {
  critical.generate({
    base: '_site/',
    src: 'index.html',
    css: ['assets/css/main.css'],
    dimensions: [{
      width: 320,
      height: 480
    },{
      width: 768,
      height: 1024
    },{
      width: 1280,
      height: 960
    }],
    dest: '../_includes/critical.css',
    minify: true,
    extract: false,
    ignore: ['@font-face']
  });
});

gulp.task('watch', function() {
  gulp.watch('_sass/**/*.scss', ['sass']);
  gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_events/*.md', '_communities/*.md',  'pages_/*.md', '_include/*html'], ['rebuild']);
  gulp.watch(src.js, ['js']);
});

gulp.task('dev', function() {
  gulp.watch(src.js, ['js']);
  gulp.watch('_sass/**/*.scss', ['sass']);
});

gulp.task('default', ['browser-sync', 'watch']);


gulp.task('markdown', function() {
  console.log('building markdown');
  // return request('https://our-communities-api.herokuapp.com/getData', function(error, response, body) {
  return request('http://localhost:8080/getData', function(error, response, body) {
        let events = JSON.parse(body);

        // Choose the path wisely
        let dirPath = '';
        if(isProduction){
          dirPath = '/opt/build/repo/_events';
        } else {
          dirPath = '_events';
        }

        // Empty the events directory
        try {
          var files = fs.readdirSync(dirPath);
        } catch(e) {
          return;
        }
        if (files.length > 0){
          for (let i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile()){
              fs.unlinkSync(filePath);
            }
            else{
              rmDir(filePath);
            }
          }
        }

        // Create a blank file to prevent the dev folder being untracked
        let logger = fs.createWriteStream(`${dirPath}/file`);
        logger.end();

        // Generate the markdown for each event
        events.forEach(evt => {
          let fileTitle = evt.title.toLowerCase().replace(/\s+/g, '-');
          fileTitle = fileTitle.replace(/(\/)/g, '-');
          fileTitle = fileTitle.replace(/(\:)/g, '-');
          fileTitle += '-';
          fileTitle += evt.id.toLowerCase();

          evt.title = evt.title.replace(/(\:)/g, '-');

          let logger = fs.createWriteStream(`${dirPath}/${fileTitle}.md`);

          logger.write(`---\n`);
          logger.write(`layout: page\n`);
          logger.write(`title: ${evt.title}\n`);
          logger.write(`start: '${evt.start}'\n`);
          logger.write(`end: '${evt.end}'\n`);
          logger.write(`displayDate: '${evt.displayDate}'\n`);
          logger.write(`displayTime: '${evt.displayTime}'\n`);
          logger.write(`organiserid: ${evt.organiserID}\n`);
          logger.write(`organiserName: ${evt.orgName}\n`);
          logger.write(`organiserAltName: ${evt.orgAltName}\n`);
          logger.write(`ticketurl: ${evt.ticketURL}\n`);
          logger.write(`venue: ${evt.venue}\n`);
          logger.write(`geographic: ${evt.geographic}\n`);
          logger.write(`lat: ${evt.lat}\n`);
          logger.write(`long: ${evt.long}\n`);
          logger.write(`---\n`);
          logger.write(`${evt.description}\n`);
          logger.end();
        });
    });
});

// Minify HTML
gulp.task('html', function() {
    gulp.src('./_site/index.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('./_site'));
    gulp.src('./_site/*/*html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('./_site/./'));
});

gulp.task('sw', function() {
  const rootDir ='./';
  const distDir = './_site';

  sw.write(`${rootDir}/sw.js`, {
    staticFileGlobs: [distDir + '/**/*.{js,html,css,png,jpg,svg}'],
    stripPrefix: distDir
  });
});

// Images
gulp.task('img', function() {
  return gulp.src('_img/communities/*.{png,jpg}')
    .pipe($.responsive({
      // For all the images in the folder
      '*': [{
        width: 230,
        rename: {suffix: '_placehold'},
      }, {
        // thubmnail
        width: 535,
        rename: { suffix: '_thumb' },
      },
      {
        // thumbnail @2x
        width: 535 * 2,
        rename: { suffix: '_thumb@2x' },
    // {
    //     width: 575,
    //     rename: { suffix: '_xs'}
    //   }, {
    //     width: 767,
    //     rename: {suffix: '_sm'}
    //   }, {
    //     width: 991,
    //     rename: { suffix: '_md' }
    //   }, {
    //     width: 1999,
    //     rename: { suffix: '_lg' }
    //   }, {
    //     // max-width hero
    //     width: 1920,
      }],
    },
    {
      quality: 85,
      progressive: true,
      withMetadata: false,
      errorOnEnlargement: false,
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('assets/img/communities/'));
});


gulp.task('clean', function () {
    return gulp.src('_site', {read: false})
      .pipe(clean());
});


gulp.task('deploy', ['markdown']);

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('build', ['sass', 'js', 'jekyll-build', 'img', 'sw']);
