var exec = require('child_process').exec;
var gulp = require('gulp');
var del = require('del');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var inlineNg2Template = require('gulp-inline-ng2-template');
var runSequence = require('run-sequence');

var tscConfig = tsc.createProject('tsconfig.json', {
    typescript: require('typescript')
});

gulp.task('clean', function () {
    return del.sync('lib/**/*');
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

gulp.task('compile:lib', function (cb) {
    exec('ngc -p tsconfig.json', function (err, stdout, stderr) {
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
        cb(err);
  });
});

gulp.task('compile:index', function () {
    var r = gulp.src(['index.ts', 'node_modules/@types/!(vinyl)/*.d.ts'])
            .pipe(sourcemaps.init())
            .pipe(tscConfig())
    r.dts.pipe(gulp.dest('.'));
    r.js.pipe(gulp.dest('.'));

    return r.pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('.'));
});

gulp.task('clean:postcompile', function () {
    return del.sync(['src/templates/default/color-picker.css', 'lib/*[!\.][!d].ts']);
});

gulp.task('default', function (callback) {
    runSequence('clean', 'sass', 'createts', 'compile:lib', 'compile:index', 'clean:postcompile', callback);
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
