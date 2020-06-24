module.exports = {
  filename: "_smart-grid",
  outputStyle: 'sass',
  /* less || scss || sass || styl */
  columns: 12,
  /* number of grid columns */
  offset: '30px',
  /* gutter width px || % || rem */
  mobileFirst: false,
  /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: '1170px',
    /* max-width оn very large screen */
    fields: '15px' /* side fields */
  },
  breakPoints: {
    md: {
      width: '992px',
    },
    sm: {
      width: '885px',
      fields: '15px' /* set fields only if you want to change container.fields */
    },
    xs: {
      width: '670px'
    },
    xxs: {
      width: '480px'
    }
  }
};