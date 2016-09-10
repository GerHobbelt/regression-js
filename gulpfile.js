'use strict';

var gulp        = require('gulp'),
    streamify   = require('gulp-streamify'),
    source      = require('vinyl-source-stream'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    license     = require('gulp-license'),
    notify      = require('gulp-notify'),
    jshint      = require('gulp-jshint'),
    mocha       = require('gulp-mocha');

gulp.task('build', function () {
    return gulp.src('./src/regression.js')
        .pipe(license('MIT', {organization: 'Tom Alexander'}))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(streamify(uglify()))
        .pipe(license('MIT', {organization: 'Tom Alexander'}))
        .pipe(gulp.dest('./dist/'))
        .pipe(notify({ message: 'Build task complete' }));
});

gulp.task('lint', function () {
    return gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
    return gulp
        .src('test/*.test.js')
        .pipe(mocha());
});

gulp.task('default', ['lint', 'test', 'build']);
