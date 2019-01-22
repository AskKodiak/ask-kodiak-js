/* eslint-env node, es6 */
/* eslint no-console: "off" */
const { series, parallel, src, dest } = require('gulp'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      strip = require('gulp-strip-comments'),
      del = require('del'),
      open = require('gulp-open'), // Gulp browser opening plugin
      connect = require('gulp-connect'); // Gulp Web server runner plugin;

var test = {
      clean: function () {
        return del([
          'builds/'
        ]);
      },
      copyJS: function () {
        return src('index.js')
          .pipe(strip())
          .pipe(rename('ask-kodiak-js.js'))
          .pipe(dest('builds/'));
      },
      minifyJS: function () {
        return src('index.js')
          .pipe(uglify())
          .pipe(rename('ask-kodiak-js-min.js'))
          .pipe(dest('builds/'));
      },
      copyTests: function () {
        return src('test/**')
          .pipe(dest('builds/'));
      },
      copyMocha: function () {
        return src('node_modules/mocha/**')
          .pipe(dest('builds/mocha'));
      },
      copyChai: function () {
        return src('node_modules/chai/**')
          .pipe(dest('builds/chai'));
      },
      serve: function (done) {
        connect.server({
          root: './builds',
          port: 3000
        });
      },
      browser: function () {
        return open({
          app: 'Google Chrome',
          uri: 'http://localhost:3000'
        });
      }
    },
    dist = {
      clean: function () {
        return del([
          'dist/'
        ]);
      },
      copyJS: function () {
        return src('index.js')
          .pipe(strip()) //remove comments
          .pipe(rename('ask-kodiak-js.js'))
          .pipe(dest('dist/'));
      },
      minifyJS: function () {
        return src('index.js')
          .pipe(strip()) //remove comments
          .pipe(uglify()) //minify
          .pipe(rename('ask-kodiak-js-min.js'))
          .pipe(dest('dist/'));
      }
    };

// default = tests
exports.default = series(
  test.clean,
  parallel(
    test.copyJS,
    test.copyTests,
    test.minifyJS,
    test.copyMocha,
    test.copyChai
  ),
  test.serve
);

exports.dist = series(
  dist.clean,
  parallel(
    dist.copyJS,
    dist.minifyJS
  )
);
