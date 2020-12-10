import React from 'react'

import Spinner from 'gatsby-theme-atomic-design/src/templates/Spinner'

const Loading = ({ navigate, next, ...props }) =>
  <Spinner
    {...props}
    onComplete={() => navigate(next)}
  />

export default Loading
