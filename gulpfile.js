
	var gulp = require("gulp");
	var uglify = require("gulp-uglify");
	var concat = require("gulp-concat");
	var cssnano = require("gulp-cssnano");
	var htmlmin =require("gulp-htmlmin");

	gulp.task("script",function(){
		gulp.src("./src/js/*.js")
			.pipe(uglify())
			.pipe(gulp.dest("./dist/js"));i
	});
	gulp.task("styleSheet",function () {
		gulp.src("./src/css/*.css")
			.pipe(cssnano())
			.pipe(gulp.dest("./dist/css"));
    });
	gulp.task("htmlmin",function () {
		gulp.src("./src/*.html")
			.pipe(htmlmin({
                collapseWhitespace: true
			}))
			.pipe(gulp.dest("./dist"));
    });


