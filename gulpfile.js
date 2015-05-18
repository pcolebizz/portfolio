var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
	concatCss = require('gulp-concat-css');
	//handlebars = require('gulp-compile-handlebars');
	
	gulp.task('styles', function() {
	  return sass('src/css/master.scss', { style: 'expanded' }).on('error', errorHandler)
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	    .pipe(gulp.dest('build/css'))
	    .pipe(rename({suffix: '.min'}))
	    .pipe(minifycss())
	    .pipe(gulp.dest('build/css'))
	    .pipe(notify({ message: 'Styles task complete' }));
	});
	
	
	gulp.task('scripts', function() {
	  return gulp.src('src/js/*.js')
	    //.pipe(jshint('.jshintrc'))
	    //.pipe(jshint.reporter('default'))
	    .pipe(concat('all-scripts.js'))
	    .pipe(gulp.dest('build/js'))
	    .pipe(rename({suffix: '.min'}))
	    .pipe(uglify())
	    .pipe(gulp.dest('build/js'))
	    .pipe(notify({ message: 'Scripts task complete' }));
	});
	
	//move the js vendor file
	gulp.task('move-vendor-files', function(){
		return gulp.src('src/js/vendor/*.js')
        .pipe(gulp.dest('build/js/vendor'))
		.pipe(notify({ message: 'Move vendor js files task complete' }));
	});
	
	//compress images
	gulp.task('images', function() {
	  return gulp.src('src/img/**/*')
	    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
	    .pipe(gulp.dest('build/img'))
	    .pipe(notify({ message: 'Images task complete' }));
	});
	
	//concat js
	gulp.task('concatjs', function(){
		return gulp.src('src/js/*.js')
		.pipe(concat('all-scripts.js'))
        .pipe(gulp.dest('build/js'))
		.pipe(notify({ message: 'Concat JS task complete' }));
	});
	
	//concat css
	gulp.task('concatcss', function () {
	  gulp.src('src/css/**/*.scss')
	    .pipe(concatCss("main.scss"))
	    .pipe(gulp.dest('src/css/'));
	});


	// Clean
	gulp.task('clean', function(cb) {
	    del(['build/css', 'build/js'], cb)
	});
	
	// Clean-with images
	gulp.task('clean-with-images', function(cb) {
	    del(['build/css', 'build/js', 'build/img'], cb)
	});
	
	// Default task with images
	gulp.task('default-images', ['clean-with-images'], function() {
	    gulp.start('styles','scripts', 'images','move-vendor-files');
		//gulp.start('watch', 'styles','concatjs','scripts', 'images');
	});

	// Default task
	gulp.task('default', ['clean'], function() {
	    gulp.start('styles','scripts','move-vendor-files');
		//gulp.start('watch', 'styles','concatjs','scripts', 'images');
	});
	
	
	gulp.task('watch', function() {

	  // Watch .scss files
	  gulp.watch('src/css/**/*.scss', ['styles']);

	  // Watch .js files
	  gulp.watch('src/js/**/*.js', ['scripts']);

	  // Watch image files
	  gulp.watch('src/img/**/*', ['images']);
	  
	  // Create LiveReload server
	  livereload.listen();
 
	  // Watch any files in dist/, reload on change
	  gulp.watch(['src/**/*']).on('change', livereload.changed);

	});

	// Handle the error
	function errorHandler (error) {
	  console.log("THIS IS IT: " + error.toString());
	  this.emit('end');
	}
