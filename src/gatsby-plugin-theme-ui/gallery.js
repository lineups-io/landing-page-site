const gallery = {
  links: {
    back: {
      px: 4,
      bg: 'white',
      color: 'text',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    gallery: {
      cursor: 'pointer',
      width: ['100%', '150px', '150px'],
      color: 'text',
      textDecoration: 'none',
      fontFamily: 'body',
      fontSize: 2,
      fontWeight: 'body',
      '> div': {
        boxShadow: 'rgb(0 0 0 / 18%) 0px 2px 4px'
      },
      '&:hover img': {
        opacity: 0.95
      }
    }
  },
  boxes: {
    placeholder: {
      bg: 'muted',
      width: '100%',
      height: '100%',
    },
  },
}

export default gallery
