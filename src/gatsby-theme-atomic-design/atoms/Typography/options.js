export default {
  headerFontFamily: ['Calluna', 'serif'],
  bodyFontFamily: ['Beauchef', 'sans-serif'],
  bodyWeight: 400,
  overrideThemeStyles: function overrideThemeStyles(vr, options, styles) {
    return {
      'h1,h2,h3,h4,h5,h6': {
        marginBottom: vr.rhythm(1 / 3),
      },
    }
  },
}