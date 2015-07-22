(function (r) {
    "use strict";

    var gulp = r("gulp");
    var sass = r("gulp-sass");
    var jade = r('gulp-jade');
    var browserSync = r("browser-sync").create();

    // Static Server + watching sass/jade files
    gulp.task("serve", ["sass", "jade"], function() {

        browserSync.init({
            server: "."
        });

        gulp.watch("./src/**/*.scss", ["sass"]);
        gulp.watch("./src/**/*.jade", ["jade"]);
        gulp.watch("./dist/**/*.html").on("change", browserSync.reload);
    });

    gulp.task("sass", function () {
        gulp.src("./src/**/*.scss")
            .pipe(sass())
            .pipe(gulp.dest("./dist"))
            .pipe(browserSync.stream());
    });

    gulp.task('jade', function() {
        gulp.src('./src/**/*.jade')
            .pipe(jade({
                pretty: true,
                locals: {}
            }))
            .pipe(gulp.dest('./dist'))
            .pipe(browserSync.stream());
    });

    gulp.task("default", ["serve"]);
}(require));
