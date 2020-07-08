// VARIABLES & PATHS
let preprocessor = 'sass', // Preprocessor (sass, scss, less, styl)
		fileswatch	 = 'html,htm,txt,json,md,woff2', // List of files extensions for watching & hard reload (comma separated)
		imageswatch	 = 'jpg,jpeg,png,webp,ico,svg', // List of images extensions for watching & compression (comma separated)
		baseDir			 = 'app', // Base directory path without «/» at the end
		online			 = true; // If «false» - Browsersync will work offline without internet connection

let paths = {

	scripts: {
		src: [
			'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
			'app/libs/slick-carousel/slick/slick.min.js',
			baseDir + '/js/app.js' // app.js. Always at the end
		],
		dest: baseDir + '/assets/js',
	},

	otherScripts: {
		src: baseDir + '/js/add/*.js',
		dest: baseDir + '/assets/js/add',
	},

	styles: {
		src: baseDir + '/' + preprocessor + '/**/*.' + preprocessor + '',
		dest: baseDir + '/assets/css',
	},

	images: {
		src: baseDir + '/images/**/*',
		dest: baseDir + '/assets/img/',
	},

	deploy: {
		hostname: 'username@yousite.com', // Deploy hostname
		destination: 'yousite/public_html/', // Deploy destination
		include: [ /* '*.htaccess' */], // Included files to deploy
		exclude: [ '**/Thumbs.db', '**/*.DS_Store' ], // Excluded files from deploy
	},

	cssOutputName: 'app.min.css',
	jsOutputName: 'app.min.js',

}

// LOGIC
const { src, dest, parallel, series, watch } = require( 'gulp' );
const gulp-sass  = require( 'gulp-sass' );
const scss = require( 'gulp-sass' );
const less = require( 'gulp-less' );
const styl = require( 'gulp-stylus' );
const cleancss = require( 'gulp-clean-css' );
const concat = require( 'gulp-concat' );
const browserSync = require( 'browser-sync' ).create();
const uglify = require( 'gulp-uglify-es' ).default;
const autoprefixer = require( 'gulp-autoprefixer' );
const imagemin = require( 'gulp-imagemin' );
const newer = require( 'gulp-newer' );
const rsync = require( 'gulp-rsync' );
const del = require( 'del' );
const smartgrid = require( 'smart-grid' );
const rename = require( 'gulp-rename' );

function browsersync() {
	browserSync.init( {
		server: {
			baseDir: baseDir + '/'
		},
		notify: false,
		online: online
	} )
}

function scripts() {
	return src( paths.scripts.src )
		.pipe( concat( paths.jsOutputName ) )
		.pipe( uglify() )
		.pipe( dest( paths.scripts.dest ) )
		.pipe( browserSync.stream() )
}

function otherScripts() {
	return src( paths.otherScripts.src )
		//.pipe(uglify())
		.pipe( dest( paths.otherScripts.dest ) )
		.pipe( browserSync.stream() )
}

function styles() {
	return src( paths.styles.src )
		.pipe( eval( preprocessor )( {
			outputStyle: 'expanded'
		} ) )
		.pipe( rename( {
			suffix: '.min',
			prefix: ''
		} ) )
		.pipe( autoprefixer( {
			overrideBrowserslist: [ 'last 15 versions' ],
			grid: true
		} ) )
		.pipe( cleancss( {
			level: {
				1: {
					specialComments: 0
				}
			},
			/* format: 'beautify' */
		} ) )
		.pipe( dest( paths.styles.dest ) )
		.pipe( browserSync.stream() )
}

function images() {
	return src( paths.images.src )
		.pipe( newer( paths.images.dest ) )
		.pipe( imagemin( [
			imagemin.gifsicle(),
			imagemin.mozjpeg(),
			imagemin.optipng()
		] ) )
		.pipe( dest( paths.images.dest ) )
}

function cleanimg() {
	return del( '' + paths.images.dest + '/**/*', {
		force: true
	} )
}

function cleandist() {
	return del( 'dist/**/*', {
		force: true
	} )
}

function grid( done ) {
	delete require.cache[ require.resolve( './smartgrid.js' ) ]
	let settings = require( './smartgrid.js' )

	smartgrid( './app/' + preprocessor, settings );
	done();
}

function buildcopy() {
	return src( [
			'app/assets/css/**/*',
			'app/assets/js/**/*',
			'app/assets/img/**/*',
			'app/assets/fonts/**/*',
			'app/ht.access',
			'app/**/*.html',
		], {
			base: 'app'
		} )
		.pipe( dest( 'dist' ) );
}

function deploy() {
	return src( baseDir + '/' )
		.pipe( rsync( {
			root: baseDir + '/',
			hostname: paths.deploy.hostname,
			destination: paths.deploy.destination,
			include: paths.deploy.include,
			exclude: paths.deploy.exclude,
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		} ) )
}

function startwatch() {
	watch( baseDir + '/**/' + preprocessor + '/**/*', styles );
	watch( baseDir + '/**/*.{' + imageswatch + '}', images );
	watch( baseDir + '/**/*.{' + fileswatch + '}' ).on( 'change', browserSync.reload );
	watch( baseDir + '/js/*.js', scripts );
	watch( baseDir + '/js/add/*.js', otherScripts );
}

exports.browsersync = browsersync;
exports.styles = styles;
exports.scripts = scripts;
exports.otherScripts = otherScripts;
exports.images = images;
exports.grid = grid;
exports.cleanimg = cleanimg;

exports.deploy = deploy;
exports.assets = series( cleanimg, styles, scripts, images );
exports.build = series( cleandist, cleanimg, styles, scripts, images, buildcopy );
exports.default = parallel( grid, images, styles, scripts, otherScripts, browsersync, startwatch );