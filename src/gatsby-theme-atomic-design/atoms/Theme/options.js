import typography from '../Typography/options'

const { headerFontFamily, bodyFontFamily } = typography

export const gutter = 15

export const colors = {
  primary: '#007AB8',
  secondary: '#007AB8',
  tertiary: '#ca4500',
  special: '#ca4500',
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',
  white: '#ffffff',
  black: '#333333',
  black400: '#8c8d8e',
  black500: '#282929',
  red: '#e5203c',
}

export const fonts = {
  header: headerFontFamily.join(','),
  body: bodyFontFamily.join(','),
}
