/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*--  Variables  --*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var batch = require('gulp-batch');

var clean = require('gulp-clean');
var inject = require('gulp-inject');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var util = require('util');
var modRewrite = require('connect-modrewrite');
var middleware = require('proxy');


var glob = require("glob")
var mainBowerFiles = require('gulp-main-bower-files');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'del', 'gulp.*']
});

/*-- Stream Task  --*/
gulp.task('stream', function () {
    gulp.src(['scss/main.scss'])
            .pipe(sass({errLogToConsole: true}))
            .pipe(concat('main.css'))
            .pipe(minifyCSS())
            .pipe(concat('main.min.css'))
            .pipe(gulp.dest('css'));
});

/*-- Clean Task  --*/
gulp.task('clean', function () {
    return gulp.src(['./dist/index.html', './tmp/index.html'], {read: false})
            .pipe(clean());
});

/*-- Inject Task  --*/
gulp.task('inject', function () {
    var target = gulp.src('index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src(['assets/js/*.js', 'assets/css/*.css'],
            {
                read: false
            });

    return target.pipe(inject(sources))
            .pipe(gulp.dest('./dist'));
});

/*-- Fonts Task  --*/
gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
            .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
            .pipe($.flatten())
            .pipe(gulp.dest('dist/fonts/bootstrap'));
});

/*--  Watch Task  --*/
gulp.task('watch', function () {
    watch('scss/**/*.scss', function () {
        gulp.start('stream');
    });
});

// Save a reference to the `reload` method
// Watch scss AND html files, doing different things with each.
function browserSyncInit(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if (baseDir === './' || (util.isArray(baseDir) && baseDir.indexOf('./') !== -1)) {
        routes = {
            '/bower_components': 'bower_components',
            '/node_modules': 'node_modules'
        };
    }

    browserSync.instance = browserSync.init(files, {
        startPath: './',
        server: {
            baseDir: baseDir,
            middleware: [
                modRewrite(['!\\.\\w+$ /index.html [L]'])
            ],
            routes: routes
        },
        browser: browser
    });

}

/*-- Serve Task  --*/
gulp.task('serve', ['watch'], function () {
    browserSyncInit([
        './'
    ], [
        'assets/js/*.js',
        'assets/images/**/*',
        '*.html'
    ]);
});

/*--  Compress Task  --*/
gulp.task('compress', function () {
    gulp.src([
        'assets/js/jquery.min.js',
        'assets/js/tether.min.js',
        'assets/js/bootstrap.min.js',
        'assets/js/custom.js'
    ])
            .pipe(uglify())
            .pipe(concat('main.min.js'))
            .pipe(gulp.dest('./src'));
});

/*-- Default Function  --*/
gulp.task('default', function () {
    /*--  place code for your default task here  --*/
    gulp.task('default', ['compress', 'stream']);
});