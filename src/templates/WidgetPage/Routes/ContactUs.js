import React from 'react'

import ContactUs from 'gatsby-theme-atomic-design/src/templates/ContactUs'

import NavLeft from '../NavLeft'

const ContactUs2 = ({ navigate, next, ...props }) =>
  <ContactUs
    {...props}
    onSubmit={data => navigate(next, data)}
    NavLeft={() => <NavLeft onClick={() => navigate(-1)} />}
  />

export default ContactUs2
