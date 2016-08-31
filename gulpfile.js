var gulp = require('gulp');
var del = require('del');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var inlineNg2Template = require('gulp-inline-ng2-template');
var runSequence = require('run-sequence');

var tscConfig = tsc.createProject('tsconfig.json', {
  typescript: require('typescript')
});

gulp.task('clean', function () {
    return del.sync('lib/**/*');
});

gulp.task('copy:assets', function () {
    return gulp.src(['src/templates/**/*', '!src/templates/**/*.scss'])
           .pipe(gulp.dest('lib/templates'));
});

gulp.task('sass', function () {
    return gulp.src('src/**/*.scss')
            .pipe(sass())
            //.pipe(gulpIf('*.css', uglify()))
            .pipe(gulp.dest('lib'));
});

gulp.task('compile', function () {
    var r = gulp.src(['src/**/*.ts', 'node_modules/@types/!(vinyl)/*.d.ts'])
            .pipe(inlineNg2Template({base: '/lib'}))
            .pipe(sourcemaps.init())
            .pipe(tsc(tscConfig))
    r.dts.pipe(gulp.dest('lib'));
    r.js.pipe(gulp.dest('lib'));
    
    return r.pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('lib'));
});

gulp.task('compile:index', function () {
    var r = gulp.src(['index.ts', 'node_modules/@types/!(vinyl)/*.d.ts'])
            .pipe(sourcemaps.init())
            .pipe(tsc(tscConfig))
    r.dts.pipe(gulp.dest('.'));
    r.js.pipe(gulp.dest('.'));
    
    return r.pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('.'));
});

gulp.task('clean:templates', function () {
    return del.sync('lib/templates');
});

gulp.task('default', function (callback) {
    runSequence('clean', 'copy:assets', 'sass', 'compile', 'clean:templates', 'compile:index', callback);
});

//copy the library to example/node_modules/angular2-color-picker
gulp.task('fake', function (callback) {
    runSequence('clean:fake', 'copy:fake', 'copy:index', callback);
});

gulp.task('copy:fake', function () {
    return gulp.src(['lib/**/*'])
           .pipe(gulp.dest('examples/node_modules/angular2-color-picker/lib'));           
});

gulp.task('copy:index', function () {
    return gulp.src(['index.*'])
           .pipe(gulp.dest('examples/node_modules/angular2-color-picker'));
});

gulp.task('clean:fake', function () {
    return del.sync('examples/node_modules/angular2-color-picker/**/*');
});