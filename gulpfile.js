const gulp = require("gulp");

gulp.task("processHTML", () => {
  gulp.src("*.html").pipe(gulp.dest("dist"));
});
