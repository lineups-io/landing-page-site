import React from 'react'

import GuestCard from 'gatsby-theme-atomic-design/src/templates/GuestCard'

import NavLeft from '../NavLeft'

const GuestCard2 = ({ navigate, next, ...props }) =>
  <GuestCard
    {...props}
    onSubmit={data => navigate(next, data)}
    NavLeft={() => <NavLeft onClick={() => navigate(-1)} />}
  />

export default GuestCard2
