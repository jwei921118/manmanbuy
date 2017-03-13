

	var gulp = require("gulp");

	gulp.task("script",function(){
		gulp.src("./src/js/.*.js")
		.pipe(gulp.dest("./dist"));
	});


