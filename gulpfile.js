const autoprefixer = require('autoprefixer')
const browsersync = require('browser-sync').create()
const cssnano = require('cssnano')
const del = require('del')
const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const minifyjs = require('gulp-js-minify')
const nunjucks = require('gulp-nunjucks-html')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const webp = require('gulp-webp')

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "build"
    },
    port: 3000
  });
  done();
}

// Clean assets
function clean() {
  return del(['dist']);
}

// Copy files
function copy(){
  return gulp
    .src('build/**/*','build/*.html')
    .pipe(gulp.dest('dist/assets','dist/pages'))
}

// Copy fonts
function fonts() {
  return gulp
    .src('src/assets/fonts/*')
    .pipe(gulp.dest('build/fonts'))
}

// Optimize Images
function images() {
  return gulp
    .src('src/assets/images/**/*')
    .pipe(newer('build/images'))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest('build/images'))  
}  

// Convert images to webp
function imageswebp() {
  return gulp
  .src('src/assets/images/**/*.{jpg,png}')
  .pipe(
    webp({
      quality:75,
      preset: 'photo',
      method: 6
    })
  )
  .pipe(gulp.dest('build/images'))
}
 
// CSS task
function css() {
  return gulp
    .src('src/assets/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('build/css'))
    .pipe(browsersync.stream())
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src(['src/assets/js/*'])
      .pipe(plumber())
      .pipe(minifyjs())
      .pipe(gulp.dest('build/js'))
  )
}

// HTML task
function html(){
  return gulp
    .src(['src/templates/*.html'])
		.pipe(nunjucks({searchPaths: ['src/templates/']}))
		.pipe(gulp.dest('build'))
		.pipe(browsersync.stream())
}

// Watch files
function watchFiles() {
  gulp.watch('src/assets/scss/**/*.scss', css) 
  gulp.watch("src/assets/js/*", scripts)
  gulp.watch('src/templates/**/*.html', html) 
  gulp.watch('src/assets/images/**/*', images)
}

const js = gulp.series(scripts)
const build = gulp.series(clean,copy)
const watch = gulp.parallel([watchFiles,browserSync,css,scripts,html,images,fonts])

exports.images = images
exports.imageswebp = imageswebp
exports.css = css
exports.html = html
exports.js = js
exports.clean = clean
exports.build = build
exports.watch = watch
