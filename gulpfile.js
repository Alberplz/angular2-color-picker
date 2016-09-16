var gulp = require('gulp');
var del = require('del');
var tsc = require('gulp-typescript');
var gulpTypings = require("gulp-typings");
var sourcemaps = require('gulp-sourcemaps');
var tscConfig = require('./tsconfig.json');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var inlineNg2Template = require('gulp-inline-ng2-template');
var runSequence = require('run-sequence');

gulp.task('clean', function () {
    return del.sync('lib/**/*');
});

gulp.task("typings", function () {
    return gulp.src("./typings.json").pipe(gulpTypings());
});

gulp.task('sass', function () {
    return gulp.src('src/**/*.scss')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(gulp.dest('src'));
});

gulp.task('createts', function () {
    return gulp.src(['src/**/*.ts'])
            .pipe(inlineNg2Template({base: '/src'}))
            .pipe(gulp.dest('lib'));
});

gulp.task('compile:lib', function () {
    var r = gulp.src(['typings/index.d.ts', 'lib/**/*.ts'])
            .pipe(sourcemaps.init())
            .pipe(tsc(tscConfig.compilerOptions));

    r.dts.pipe(gulp.dest('lib'));
    r.js.pipe(uglify()).pipe(gulp.dest('lib'));

    return r.pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('lib'));
});

gulp.task('compile:index', function () {
    var r = gulp.src(['typings/index.d.ts', 'index.ts'])
            .pipe(sourcemaps.init())
            .pipe(tsc(tscConfig.compilerOptions));

    r.dts.pipe(gulp.dest('.'));
    r.js.pipe(gulp.dest('.'));

    return r.pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('.'));
});

gulp.task('clean:postcompile', function () {
    return del.sync('src/templates/default/color-picker.css');
});

gulp.task('default', function (callback) {
    runSequence('clean', 'typings', 'sass', 'createts', 'compile:lib', 'compile:index', 'clean:postcompile', callback);
});

//copy the library to example/node_modules/angular2-color-picker and examples_webpack/node_modules/angular2-color-picker
gulp.task('copylib', function (callback) {
    runSequence('clean:examples', 'copy:lib', 'copy:index', callback);
});

gulp.task('copy:lib', function () {
    return gulp.src(['lib/**/*'])
            .pipe(gulp.dest('examples_webpack/node_modules/angular2-color-picker/lib'))
            .pipe(gulp.dest('examples/node_modules/angular2-color-picker/lib'));
});

gulp.task('copy:index', function () {
    return gulp.src(['index.*'])
            .pipe(gulp.dest('examples/node_modules/angular2-color-picker'))
            .pipe(gulp.dest('examples/node_modules/angular2-color-picker'));
});

gulp.task('clean:examples', function () {
    return del.sync('examples_webpack/node_modules/angular2-color-picker/**/*', 'examples/node_modules/angular2-color-picker/**/*');
});