var gulp = require('gulp'),
	del = require('del'),
	flatten = require('gulp-flatten'),
	merge = require('merge2'),
	sass = require('gulp-ruby-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	tsc = require('gulp-typescript'),
	tsProject = tsc.createProject('tsconfig.json'),
	inlineNg2Template = require('gulp-inline-ng2-template');

gulp.task('sass', function () {
	//TODO put generated .css into a separate directory and adjust inlineNg2Template to catch it from there
  return sass('src/*.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('src'));
});

gulp.task('inline', function () {
    var tsResult = gulp.src(['typings/index.d.ts', 'src/**/*.ts'], {base: 'src'})
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated 
        .pipe(inlineNg2Template({base: 'src'})) // inline templates
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
	return del('src/*.css')
});

gulp.task('default', gulp.series('sass', 'inline', 'cleanup'));