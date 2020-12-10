import React from 'react'

import Confirmation from 'gatsby-theme-atomic-design/src/templates/Confirmation'

const Confirmation2 = ({ navigate, ...props }) =>
  <Confirmation
    {...props}
    onStartOver={() => navigate('/')}
    onContactUs={() => navigate('/contact-us')}
    onScheduleTour={() => navigate('/schedule-tour')}
  />

export default Confirmation2
