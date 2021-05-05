const config = require("../config"),
  useref = require("gulp-useref"),
  gulpif = require("gulp-if"),
  babel = require("gulp-babel"),
  replace = require("gulp-replace"),
  uglify = require("gulp-uglify-es").default,
  cleanCss = require("gulp-clean-css");

module.exports = function (gulp, plugins) {
  return function () {
    var stream = gulp
      .src(config.deployCode.src)
      .pipe(
        replace(config.deployCode.replace.first, config.deployCode.replace.last)
      )
      .pipe(useref())
      .pipe(gulpif(config.deployCode.if.js, babel(config.deployCode.babel)))
      .pipe(gulpif(config.deployCode.if.js, uglify()))
      .pipe(gulpif(config.deployCode.if.css, cleanCss()))
      .pipe(gulp.dest(config.deployCode.dest));

    return stream;
  };
};
