var gulp = require('gulp'),
    del = require('del'),
    flatten = require('gulp-flatten'),
    merge = require('merge2'),
    sass = require('node-sass');
    sourcemaps = require('gulp-sourcemaps'),
    tsc = require('gulp-typescript'),
    tsProject = tsc.createProject('tsconfig.json'),
    inlineNg2Template = require('gulp-inline-ng2-template');


gulp.task('copy', function() {
    return gulp.src('tsconfig.json')
        .pipe(gulp.dest('lib'));
});

gulp.task('inline', function() {
    var tsResult = gulp.src(['typings/index.d.ts', 'src/**/*.ts'], {
            base: 'src'
        })
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(inlineNg2Template({
            base: 'src',
            styleProcessor: function(path, file, cb) {
                //console.log(file);


                var result =  sass.renderSync({
                    data: file
                    //outFile: yourPathTotheFile,
                });

                console.log(result);
                //console.log(result.css.toString().trim());
                return cb(null, result.css.toString().trim());

            }

        })) // inline templates
        .pipe(tsc(tsProject));

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
        tsResult.dts
        .pipe(flatten())
        .pipe(gulp.dest('lib')),
        tsResult.js
        .pipe(flatten())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('lib'))
    ]);
});

gulp.task('cleanup', function() {
    return del('lib')
});

gulp.task('default', gulp.series('cleanup', 'inline'));
