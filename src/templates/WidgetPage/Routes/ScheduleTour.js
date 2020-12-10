import React from 'react'

import ScheduleTour from 'gatsby-theme-atomic-design/src/templates/ScheduleTour'

import NavLeft from '../NavLeft'

const ScheduleTour2 = ({ navigate, next, ...props }) =>
  <ScheduleTour
    {...props}
    onSubmit={data => navigate(next, data)}
    NavLeft={() => <NavLeft onClick={() => navigate(-1)} />}
  />

export default ScheduleTour2
