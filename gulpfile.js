// gulpプラグインの読みこみ
var gulp = require('gulp');

var imagemin     = require("gulp-imagemin"); // 画像を圧縮するプラグインの読み込み
var sass         = require("gulp-sass"); // gulp-sass
var autoprefixer = require("gulp-autoprefixer");
// var frontnote    = require("gulp-frontnote");
var minifyCss    = require("gulp-minify-css");
var uglify       = require("gulp-uglify"); //min化
var browser      = require("browser-sync");
var reload       = browser.reload;
var plumber      = require("gulp-plumber");
// var gulpkss    = require("gulp-kss");

// gulp.task("watchTask", function() {
//     gulp.watch("images/**", function() {   // imagesフォルダー以下のファイルを監視
//         gulp.src("images/*.png")
//             .pipe(imagemin())
//             .pipe(gulp.dest("minified_images"));
//     });
// });

//監視
gulp.task("default",['server'], function() {
    // gulp.watch("./**", function() {
    //     browser.reload({stream:true});   // ファイルに変更があれば同期しているブラウザをリロード
    // });
    gulp.watch(["images/**"],["images"]);
    gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
    gulp.watch("sass/**/*.scss",["sass"]);
});

//ブラウザ同期
gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html").on("change", reload);
});

//image関連

gulp.task("images", function() {
    gulp.src("images"+'/**/*.+(jpg|jpeg|png|gif|svg)')
    	.pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest("minified_images"))
        .pipe(browser.reload({stream:true}))
});


//sass関連
gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
    	.pipe(plumber())
        // .pipe(frontnote({
        //     css: '../css/style.css'
        // }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe( minifyCss() )
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream:true}))
});

//js関連
gulp.task("js", function() {
    gulp.src(["js/**/*.js","!js/min/**/*.js"])
    	.pipe(plumber())
		.pipe(uglify())
        .pipe(gulp.dest("./js/min"))
        .pipe(browser.reload({stream:true}))
});






//gulp-kssの設定は後にしよう・・
gulp.task('kss', function () {
	//Clean out the current documentation folder
	gulp.src([
		'styleguide/**/*'
	], {read: false})
var themeFolder = __dirname + '/less/';
var templateFolder = __dirname + '/node_modules/kss/lib/template/';
	//Create the fresh documentation by reading through the sass files
	gulp.src(['sass/**/*.sass'])
		.pipe(gulpkss({
			overview: 'styleguide/styleguide.md', //Absolute path to markdown file which is used for styleguide home page
			templateDirectory: templateFolder
			// templateDirectory: Absolute path to template directory, by default kss-node default template is used.
			// kss: Options supported by KSS-Node (https://github.com/hughsk/kss-node)
    }))
    // .pipe(gulp.dest( dist + '/styleguide/'));
    .pipe(gulp.dest( 'styleguide/'));
    // .pipe(gulp.dest( themeFolder + '/styleguide/'));

	//Compile the KSS documentation page's style sheet so the styles will load accurately within the docs
	gulp.src("sass/**/*scss")
        .pipe(sass())
		.pipe(gulp.dest( 'styleguide/public'));

	//Add any styleguide images
	gulp.src( 'images/**/*')
		.pipe(gulp.dest( 'styleguide/'));
});
