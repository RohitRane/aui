'use strict';

var gulp = require('gulp'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    fs = require('fs'),
    uglify = require('gulp-uglify');

gulp.task('gen-env', function () {
    console.log("API server endpoint in use :");
    console.log(Object.keys(argv));
    if (argv.prod) {
        console.log("production");
        fs.createReadStream('src/env/production.js').pipe(fs.createWriteStream('src/env/env.js'));
    }
    else if (argv.uat) {
        console.log("uat");
        fs.createReadStream('src/env/uat.js').pipe(fs.createWriteStream('src/env/env.js'));
    }
    else {
        console.log("dev");
        fs.createReadStream('src/env/development.js').pipe(fs.createWriteStream('src/env/env.js'));
    }
});