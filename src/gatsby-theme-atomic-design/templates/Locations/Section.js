import styled from 'styled-components'

import Section from 'gatsby-theme-atomic-design/src/templates/Locations/Section'

const CustomSection = styled(Section)`
  h2 {
    font-family: proxima-nova, sans-serif;
  }

  h4 {
    color: ${ props => props.theme.colors.primary };
  }
`

export default CustomSection
