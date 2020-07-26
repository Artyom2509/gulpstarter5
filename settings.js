// VARS =============================================================
const vars = {
  preprocessor: 'sass', // Preprocessor (sass, scss, less, styl)
  fileswatch: 'html,htm,txt,json,md,woff2', // List of files extensions for watching & hard reload (comma separated)
  imageswatch: 'jpg,jpeg,png,webp,ico,svg', // List of images extensions for watching & compression (comma separated)
  baseDir: 'app', // Base directory path without «/» at the end
  online: true, // If «false» - Browsersync will work offline without internet connection
};

// SMARTGRID ========================================================
const smartgrid = {
  filename: "_smart-grid",
  outputStyle: vars.preprocessor,
  columns: 12,
  /* number of grid columns */
  offset: '30px',
  /* gutter width px || % || rem */
  mobileFirst: false,
  /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: '1240px',
    /* max-width оn very large screen */
    fields: '15px' /* side fields */
  },
  breakPoints: {
    md: {
      width: '992px',
    },
    sm: {
      width: '780px',
      fields: '15px' /* set fields only if you want to change container.fields */
    },
    xs: {
      width: '560px'
    },
    xxs: {
      width: '480px'
    }
  }
};

// PATHS ============================================================
const paths = {

  scripts: {
    src: [
      // 'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
      // 'app/libs/',
      'app/js/app.js' // app.js. Always at the end
    ],
    dest: 'app/assets/js',
  },

  otherScripts: {
    src: 'app/js/add/*.js',
    dest: 'app/assets/js/add',
  },

  styles: {
    src: 'app/' + vars.preprocessor + '/**/*.' + vars.preprocessor + '',
    dest: 'app/assets/css',
  },

  images: {
    src: 'app/images/**/*',
    dest: 'app/assets/img/',
  },

  deploy: {
    hostname: 'username@yousite.com', // Deploy hostname
    destination: 'yousite/public_html/', // Deploy destination
    include: [ /* '*.htaccess' */], // Included files to deploy
    exclude: [ '**/Thumbs.db', '**/*.DS_Store' ], // Excluded files from deploy
  },

  cssOutputName: 'app.min.css',
  jsOutputName: 'app.min.js',

};


const settings = {};
settings.vars = vars;
settings.paths = paths;
settings.smartgrid = smartgrid;

module.exports = settings;