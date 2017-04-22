// gulpfile.js

'use strict';

const $            = require('gulp-load-plugins')();
const gulp         = require('gulp');

const argv         = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const babelify     = require('babelify');
const browserify   = require('browserify');
const browserSync  = require('browser-sync').create();
const buffer       = require('vinyl-buffer');
const del          = require('del');
const source       = require('vinyl-source-stream');
const runSequence  = require('run-sequence');

// Include paths file
const paths = require('./_assets/gulp_config/paths');

/*
 * Uses Sass compiler to process styles, adds vendor prefixes, minifies
 */
gulp.task('build:styles:main', () => {
  let glob = gulp.src([paths.sassFiles +'/main.scss', paths.sassFiles +'/no-js.scss'])
    .pipe($.plumber())
    .pipe($.sassGlob());

  return glob.pipe($.if(!argv.prod, $.sourcemaps.init()))
    .pipe($.sass({ 
      outputStyle: 'compressed',
      sourcemap: !argv.prod
    }))
    .on('error', $.sass.logError)
    .on('error', (err) => {
      $.notify().write(err);
    })
    .pipe($.combineMq({
        beautify: false
    }))
    .pipe($.postcss([ autoprefixer({ browsers: ['> 1%'] }) ]))
    .pipe($.if(!argv.prod, $.sourcemaps.write('./')))
    .pipe(gulp.dest(paths.jekyllCssFiles))
    .pipe(gulp.dest(paths.siteCssFiles))
    .pipe(browserSync.stream());
});

/*
 * Processes critical CSS, to be included in head.html
 */
gulp.task('build:styles:critical', () => {
  return gulp.src(paths.sassFiles +'/critical.scss')
    .pipe($.plumber())
    .pipe($.sassGlob())
    .pipe($.sass({ 
        outputStyle: 'compressed'
      }))
    .on('error', $.sass.logError)
    .on('error', (err) => {
      $.notify().write(err);
    })
    .pipe($.postcss([ autoprefixer({ browsers: ['> 1%'] }) ]))
    .pipe(gulp.dest('_includes'));
});

/*
 * Builds all styles
 */
gulp.task('build:styles', ['build:styles:main', 'build:styles:critical']);

/*
 * Deletes processed CSS
 */
gulp.task('clean:styles', () => {
  return del.sync([paths.jekyllCssFiles + '/**',
                   paths.siteCssFiles + '/**',
                   '_includes/critical.css']);
});

/*
 * Processes and uglifies global JS files
 */
gulp.task('build:scripts', ['lint:scripts'], () => {
  const props = {
    entries: [paths.jsFiles + '/main.js'],
    debug: true,
    cache: {},
    packageCache: {}
  };

  const bundler = browserify(props);

  function rebundle() {
    let stream = bundler.transform('babelify')
      .bundle();
    return stream
      .pipe($.plumber())
      .on('error', (err) => { 
        $.notify().write(err);
      })
      .pipe(source('main.js'))
      .pipe($.if(argv.prod, buffer()))
      .pipe($.if(argv.prod, $.uglify()))
      .pipe(gulp.dest(paths.jekyllJsFiles))
      .pipe(gulp.dest(paths.siteJsFiles));
  }

  bundler.on('update', function() {
    rebundle();
    $.util.log('Rebundle...');
    browserSync.reload();
  });

  return rebundle();
});

/*
 * Deletes processed JS
  */
gulp.task('clean:scripts', () => {
  return del.sync([paths.jekyllJsFiles + '/main.js', 
                   paths.siteJsFiles + '/main.js']);
});

/*
 * Lint source files
 */
gulp.task('lint:scripts', function() {
  return gulp.src(paths.jsFiles + '/**/*.js')
              .pipe($.plumber())
              .pipe($.eslint())
              .pipe($.eslint.format())
              .pipe($.eslint.failAfterError());
});

/*
 * Optimizes and copies image files
 */
gulp.task('build:images', () => {
  return gulp.src(paths.imageFilesGlob)
    .pipe($.plumber())
    .pipe($.imagemin())
    .pipe(gulp.dest(paths.jekyllImageFiles))
    .pipe(gulp.dest(paths.siteImageFiles))
    .pipe(browserSync.stream());
});

/*
 * Deletes processed images
 */
gulp.task('clean:images', () => {
  return del.sync([paths.jekyllImageFiles, 
                   paths.siteImageFiles]);
});

/*
 * Runs jekyll build command
  */
gulp.task('build:jekyll', () => {
  return gulp.src('')
    .pipe($.plumber())
    .pipe($.if(argv.prod, 
      $.run('JEKYLL_ENV=production bundle exec jekyll build'), 
      $.run('bundle exec jekyll build')));
});

/*
 * Deletes the entire _site directory
 */
gulp.task('clean:jekyll', () => {
  return del.sync([paths.siteDir + '/**/*', '!' + paths.siteDir + '/.git']);
});

/*
 * Main clean task.
 * Deletes _site directory and processed assets
 */
gulp.task('clean', ['clean:jekyll', 'clean:images', 'clean:scripts', 'clean:styles']);

/*
 * Builds site anew.
 */
gulp.task('build', (done) => {
  runSequence('clean',
              ['build:scripts', 'build:images', 'build:styles'],
              'build:jekyll',
              done);
});

/*
 * Default Task: builds site
 */
gulp.task('default', ['build']);

/*
 * Special tasks for building and then reloading BrowserSync
 */
gulp.task('build:jekyll:watch', ['build:jekyll'], (done) => {
  browserSync.reload();
  done();
});

gulp.task('build:scripts:watch', ['build:scripts'], (done) => {
  browserSync.reload();
  done();
});

/*
 * Static Server + watching files
 */
gulp.task('serve', ['build'], () => {
  
  browserSync.init({
    server: paths.siteDir,
    ghostMode: false, // Toggle to mirror clicks, reloads etc (performance)
    logFileChanges: true,
    logLevel: 'debug',
    open: true        // Toggle to automatically open page when starting
  });

  // Watch site settings.
  gulp.watch(['_config.yml'], ['build:jekyll:watch']);

  // Watch .scss files; changes are piped to browserSync
  gulp.watch('_assets/styles/**/*.scss', ['build:styles']);

  // Watch .js files.
  gulp.watch('_assets/js/**/*.js', ['build:scripts:watch']);

  // Watch image files; changes are piped to browserSync
  gulp.watch('_assets/img/**/*', ['build:images']);

  // Watch posts.
  gulp.watch('_posts/**/*.+(md|markdown|MD)', ['build:jekyll:watch']);

  // Watch drafts if --drafts flag was passed
  if (module.exports.drafts) {
      gulp.watch('_drafts/*.+(md|markdown|MD)', ['build:jekyll:watch']);
  }

  // Watch html and markdown files
  gulp.watch(['**/*.+(html|md|markdown|MD)', '!_site/**/*.*'], ['build:jekyll:watch']);

  // Watch data files
  gulp.watch('_data/**.*+(yml|yaml|csv|json)', ['build:jekyll:watch']);

});