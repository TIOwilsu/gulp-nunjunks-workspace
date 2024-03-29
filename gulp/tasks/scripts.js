const config = require("../config"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify-es").default,
  sourcemaps = require("gulp-sourcemaps");

module.exports = function (gulp, plugins) {
  return function () {
    var stream = gulp
      .src(config.scripts.src.custom)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write(config.mapsPath))
      .pipe(gulp.dest(config.scripts.dest));

    return stream;
  };
};
