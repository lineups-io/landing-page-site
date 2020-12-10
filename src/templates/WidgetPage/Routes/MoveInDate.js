import React from 'react'

import InfiniteCalendar from 'gatsby-theme-atomic-design/src/templates/InfiniteCalendar'

import NavLeft from '../NavLeft'

const MoveInDate = ({ navigate, next }) =>
  <InfiniteCalendar
    NavLeft={() => <NavLeft onClick={() => navigate(-1)} />}
    onSubmit={date => navigate(next, date)}
  />


export default MoveInDate
