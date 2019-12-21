const config = require('../config')
    imagemin = require('gulp-imagemin'),
    mozjpeg = require('imagemin-mozjpeg')
    pngquant = require('imagemin-pngquant')
    svgo = require('imagemin-svgo')
    newer = require('gulp-newer')

module.exports = function(gulp, plugins){
    return function(){
        var stream = 
            gulp
                .src(config.deployImages.src)
                .pipe(newer(config.deployImages.newer))
                .pipe(
                    imagemin([
                        mozjpeg(config.deployImages.imagemin.mozjpeg),
                        pngquant(config.deployImages.imagemin.pngquant),
                        svgo(),
                    ])
                )
                .pipe(gulp.dest(config.deployImages.dest))

        return stream
    }
}