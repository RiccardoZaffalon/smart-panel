const gulp = require('gulp');
const { series, parallel, watch } = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const sass = require("gulp-sass");
const svgSprite = require("gulp-svg-sprites");
const pug = require('gulp-pug');

function javascript() {
    return gulp.src('./src/js/index.js')
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulp.dest('./dist'));
}

function css() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(gulp.dest('dist'));
}

function svg() {
    return gulp.src('dist/icons/*.svg')
        .pipe(svgSprite({
            mode: 'symbols'
        }))
        .pipe(gulp.dest('src/includes'));
}

function html() {
    return gulp.src('src/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'))    ;
}

function dev() {
    watch('./src/js/**/*.js', javascript);
    watch('./src/scss/**/*.scss', css);
    watch('./src/**/*.pug', html);
}

exports.html = html;
exports.svg = svg;
exports.build = series(svg, html, parallel(css, javascript));
exports.default = series(svg, html, parallel(css, javascript), dev);