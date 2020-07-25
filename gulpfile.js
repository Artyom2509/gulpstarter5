// LOGIC
const {
	src,
	dest,
	parallel,
	series,
	watch
} = require( 'gulp' );
const sass = require( 'gulp-sass' );
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

function vars() {
	delete require.cache[ require.resolve( './settings.js' ) ]
	let settings = require( './settings.js' )

	return baseDir = settings.vars.baseDir,
		online = settings.vars.online,
		setVarsPreprocessor = settings.vars.preprocessor, 
		setVarsFileswatch = settings.vars.fileswatch, 
		setVarsImageswatch = settings.vars.imageswatch, 

		setPathScriptsSrc = settings.paths.scripts.src,
		setPathScriptsDest = settings.paths.scripts.dest,

		setPathOtherScriptsSrc = settings.paths.otherScripts.src,
		setPathOtherScriptsDest = settings.paths.otherScripts.dest,

		setPathStylesSrc = settings.paths.styles.src,
		setPathStylesDest = settings.paths.styles.dest,

		setPathImagesSrc = settings.paths.images.src,
		setPathImagesDest = settings.paths.images.dest,

		setPathDeployHostname = settings.paths.deploy.hostname,
		setPathDeployDestination = settings.paths.deploy.destination,
		setPathDeployInclude = settings.paths.deploy.include,
		setPathDeployExclude = settings.paths.deploy.exclude,

		setPathCssOutputName = settings.paths.cssOutputName,
		setPathJsOutputName = settings.paths.jsOutputName;
}

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
	return src( setPathScriptsSrc )
		.pipe( concat( setPathJsOutputName ) )
		.pipe( uglify() )
		.pipe( dest( setPathScriptsDest ) )
		.pipe( browserSync.stream() )
}

function otherScripts() {
	return src( setPathOtherScriptsSrc )
		//.pipe(uglify())
		.pipe( dest( setPathOtherScriptsDest ) )
		.pipe( browserSync.stream() )
}

function styles() {
	return src( setPathStylesSrc )
		.pipe( eval( setVarsPreprocessor )( {
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
		.pipe( dest( setPathStylesDest ) )
		.pipe( browserSync.stream() )
}

function images() {
	return src( setPathImagesSrc )
		.pipe( newer( setPathImagesDest ) )
		.pipe( imagemin( [
			imagemin.gifsicle(),
			imagemin.mozjpeg(),
			imagemin.optipng()
		] ) )
		.pipe( dest( setPathImagesDest ) )
}

function cleanimg() {
	return del( '' + setPathImagesDest + '/**/*', {
		force: true
	} )
}

function cleandist() {
	return del( 'dist/**/*', {
		force: true
	} )
}

function grid() {
	delete require.cache[ require.resolve( './settings.js' ) ]
	let set = require( './settings.js' )

	smartgrid( './app/' + set.vars.preprocessor, set.smartgrid );
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
			hostname: setPathDeployHostname,
			destination: setPathDeployDestination,
			include: setPathDeployInclude,
			exclude: setPathDeployExclude,
			recursive: true,
			archive: true,
			silent: false,
			compress: true

		} ) )
}

function startwatch() {
	watch( baseDir + '/**/' + setVarsPreprocessor + '/**/*', styles );
	watch( baseDir + '/**/*.{' + setVarsImageswatch + '}', images );
	watch( baseDir + '/**/*.{' + setVarsFileswatch + '}' ).on( 'change', browserSync.reload );
	watch( baseDir + '/js/*.js', scripts );
	watch( baseDir + '/js/add/*.js', otherScripts );
	watch( './settings.js', parallel( vars, grid, styles, scripts, browsersync ) );
}

exports.vars = vars;
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
exports.default = parallel( vars, grid, images, styles, scripts, otherScripts, browsersync, startwatch );