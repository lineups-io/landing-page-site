import typography from './typography.js'

const { headerFontFamily, bodyFontFamily } = typography

export const base = {
  gutter: 15,
  colors: {
    primary: '#00454d',
    secondary: '#c4b000',
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    white: '#ffffff',
    black: '#424a52',
  },
  fonts: {
    header: headerFontFamily.join(','),
    body: bodyFontFamily.join(','),
  },
}

export const getTheme = (theme = base, override = {}) => {
  return {
    nav: {
      container: `
        background-color: ${ theme.colors.black };
        color: ${ theme.colors.white };
      `,
      logo: `
        height: 100%;
        min-width: 138px;
        padding: ${ theme.gutter }px 0;

        polygon, path {
          fill: ${ theme.colors.white };
        }
      `,
      link: `
        text-transform: uppercase;
        font-size: 0.8em;
        letter-spacing: 1px;
        font-weight: bold;
        background-color: ${ theme.colors.black };
        color: ${ theme.colors.white };
        text-decoration: none;

        position: relative;
        &::before {
          content: "";
          width: 0;
          height: 2px;
          background-color: ${ theme.colors.white };
          position: absolute;
          z-index: 2;
          left: 0;
          bottom: 0;
          opacity: 0;
          visibility: hidden;
          transition: all .3s ease-in-out;
        }

        &:hover::before {
          opacity: 1;
          visibility: visible;
          width: 100%;
        }

        &:hover, &[href]:hover {
          color: ${ theme.colors.white };
          text-decoration: none;
        }

        &[aria-haspopup]::after {
          border-top-color: ${ theme.colors.white }
        }
      `,
      menu: {
        container: `
          background-color: ${ theme.colors.black };
        `,
        hamburger: {
          height: 3,
          width: 20,
          offset: 7,
          color: theme.colors.white,
        },
        link: `
          padding: ${ theme.gutter * 2 / 3 }px 0;
          border-bottom-width: 3px;
          font-size: 1.5em;
        `,
      },
    },
    locations: {
      subTitle: `
        font-family: ${ headerFontFamily };
        color: ${ theme.colors.primary };
        text-transform: uppercase;
        font-weight: bold;
        font-size: .9em;
      `,
      title: `
        font-family: ${ bodyFontFamily };
        color: ${ theme.colors.gray['700'] };
        font-size: 1.875em;
        font-weight: lighter;
      `,
      apartment: `

      `,
      market: `

      `,
      state: `
        font-size: 1.2em;
        font-weight: bold;
        color: ${ theme.colors.gray['700'] };
      `,
    },
    main: {
      container: `
        background-color: ${ theme.colors.white }
      `,
      title: `
        margin: 0;
        font-size: 2.5rem;
        font-weight: 500;
      `,
      description: `
        font-weight: lighter;
        font-size: 1.25em;
        color: ${ theme.colors.gray['700'] };
      `,
      disclaimer: `
        font-size: 0.9em;
        color: ${ theme.colors.gray['700'] };
      `,
    },
    card: {
      body: `
        background-color: ${ theme.colors.white };
        border-width: 2px;
        border-style: solid;
        border-color: ${ theme.colors.gray['200'] };

        margin: ${ theme.gutter * -2 }px ${ theme.gutter }px 0;
        z-index: 1000;

        @media (min-width: 768px) {
          border-width: 1px;
        }
      `,
      hover: `
        border-color: ${ theme.colors.gray['200'] };
        box-shadow: ${ theme.colors.primary } 0 0 ${ theme.gutter * 2 / 3 }px ${ theme.gutter * -1 / 3 }px;
      `,
      row: {
        body: `
          @media (min-width: 768px) {
            margin: 0 0 0 ${ theme.gutter }px;
          }
        `,
        hover: `

        `,
      },
      title: `
        color: ${ theme.colors.black };
        font-size: 1.25em;
        line-height: 1em;
      `,
      address: `
        color: ${ theme.colors.gray['700'] };
        font-size: 1em;
        font-weight: lighter;
      `,
      bedrooms: `
        text-transform: uppercase;
        color: ${ theme.colors.gray['700'] };
        font-size: 0.9em;
        font-weight: lighter;
      `,
      amount: `
        font-size: 1.1em;
        color: ${ theme.colors.black };
      `,
      adLabel: `
        color: ${ theme.colors.black };
        background-color: ${ theme.colors.white };
        box-shadow: 0 0 2px 2px ${ theme.colors.gray['300'] };
      `,
      button: `
      `,
    },
    link: `
      display: block;
      color: ${ theme.colors.gray['700'] };

      border: 0;
      background-color: transparent;
      padding: 0;

      &[href] {
        cursor: pointer;
        text-decoration: none;
      }

      &[href]:hover {
        text-decoration: underline;
        color: ${ theme.colors.black };
      }
    `,
    button: {
      primary: `
        background-color: ${ theme.colors.black };
        border-color: ${ theme.colors.black };
        color: ${ theme.colors.white };

        &[href]:hover {
          color: ${ theme.colors.white };
        }
      `,
      danger: `
        background-color: red;
        border-color: red;
        color: ${ theme.colors.white };

        &[href]:hover {
          color: ${ theme.colors.white };
        }
      `,
      outline: `
        background-color: ${ theme.colors.white };
      `,
      default: `
        border-width: 1px;
        border-style: solid;
        border-color: ${ theme.colors.gray['200'] };
        background-color: ${ theme.colors.gray['200'] };
        color: ${ theme.colors.gray['700'] };

        &::after {
          border-color: ${ theme.colors.gray['700'] };
        }
      `,
      link: `
        border-color: ${ theme.colors.white };
        background-color: ${ theme.colors.white };
      `,
      disabled: `
        color: ${ theme.colors.gray['300'] };
        background-color: ${ theme.colors.gray['200'] };
        border-color: ${ theme.colors.gray['200'] };
      `,
    },
    dropdown: {
      toggle: `
        &::after {
          content: " ";
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top-width: 5px;
          border-top-style: solid;
          border-top-color: ${ theme.colors.gray['700'] };
          margin-left: 10px;
          margin-right: -5px;
        }
      `,
      menu: `
        background-color: ${ theme.colors.white };
        border-width: 1px;
        border-style: solid;
        border-color: ${ theme.colors.gray['200'] };
      `,
      header: `
        color: ${ theme.colors.gray['700'] };
        font-weight: bold;
      `,
      item: `
        color: ${ theme.colors.gray['700'] };
        font-size: 0.9em;

        &:hover, &[href]:hover {
          color: ${ theme.colors.black };
          background-color: ${ theme.colors.gray['200'] };
          text-decoration: none;
        }

        &[aria-current='page'], &.active {
          color: ${ theme.colors.white };
          background-color: ${ theme.colors.primary };
          &[href]:hover {
            color: ${ theme.colors.white };
            background-color: ${ theme.colors.primary };
          }
        }
      `,
    },
    well: `
      background-color: ${ theme.colors.gray['200'] };
      color: ${ theme.colors.gray['700'] };

      h2 {
        color: ${ theme.colors.black };
      }

      a {
        display: inline;
        color: ${ theme.colors.gray['700'] };
        box-shadow: ${ theme.colors.primary } 0px -2px 0px inset;
        text-decoration: none;
        transition: background 0.15s cubic-bezier(0.33, 0.66, 0.66, 1) 0s;
        border-width: 0 0 2px 0;
        border-style: solid;
        border-color: ${ theme.colors.primary };
      }

      a[href]:hover {
        text-decoration: none;
      }
    `,
    related: {
      header: `
        font-size: 1em;
        font-weight: bold;
        color: ${ theme.colors.gray['700'] };
      `,
      link: `
        font-size: 0.9em;
        color: ${ theme.colors.gray['700'] };

        &[href]:hover {
          color: ${ theme.colors.black };
          text-decoration: underline;
        }
      `,
    },
    footer: {
      container: `
        background-color: ${ theme.colors.black };
        color: ${ theme.colors.white };
        border-width: 1px 0 0 0;
        border-style: solid;
        border-color: ${ theme.colors.black };
      `,
      header: `
      `,
      link: `
        color: ${ theme.colors.white };

        svg * {
          fill: ${ theme.colors.white };
        }

        svg:hover * {
          fill: ${ theme.colors.white };
        }

        & {
          cursor: pointer;
        }

        &[href]:hover {
          text-decoration: underline;
          color: ${ theme.colors.white };
        }
      `,
    },
    label: `
      color: ${ theme.colors.gray['700'] };
      font-size: .9em;
    `,
    slider: {
      text: `
        color: ${ theme.colors.gray['700'] };
      `,
      background: `
        background-color: ${ theme.colors.gray['200'] };
      `,
      handle: `
        background: ${ theme.colors.white };
        border-color: ${ theme.colors.gray['200'] };
      `,
      progressBar: `
        background-color: ${ theme.colors.primary };
      `,
    },
    map: {
      container: `
        background-color: ${ theme.colors.gray['200'] };
      `,
      pin: {
        active: `
          fill: ${ theme.colors.secondary };
        `,
        default: `
          fill: ${ theme.colors.primary };
        `,
      },
      cluster: `
        color: ${ theme.colors.white };

        svg * {
          fill: ${ theme.colors.secondary };
        }
      `,
    },
    ...theme,
    ...override,
  }
}
