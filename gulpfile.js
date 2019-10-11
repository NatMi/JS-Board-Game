const gulp = require("gulp");

const babel = require("gulp-babel");
const jshint = require("gulp-jshint");
const uglify = require("gulp-uglify");
const runSequence = require("run-sequence");

gulp.task("processHTML", () => {
  gulp.src("*.html").pipe(gulp.dest("dist"));
});

gulp.task("processJS", () => {
  gulp
    .src("js/map.js")
    .pipe(
      jshint({
        esversion: 6
      })
    )
    .pipe(jshint.reporter("default"))
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});

gulp.task("babelPolyfill", () => {
  gulp
    .src("node_modules/babel-polyfill/browser.js")
    .pipe(gulp.dest("dist/node_modules/babel-polyfill"));
});

gulp.task("default", callback => {
  runSequence(["processHTML", "processJS", "babelPolyfill"], callback);
});
