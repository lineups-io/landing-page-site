const typographyOptions = {
  headerFontFamily: ['futura-pt', 'sans-serif'],
  bodyFontFamily: ['futura-pt', 'sans-serif'],
  bodyWeight: 500,
  scaleRatio: 2.5,
  overrideThemeStyles: function overrideThemeStyles(vr, options, styles) {
    return {
      'h1,h2,h3,h4,h5,h6': {
        marginBottom: vr.rhythm(1 / 3),
      },
    }
  },
}

export default typographyOptions
