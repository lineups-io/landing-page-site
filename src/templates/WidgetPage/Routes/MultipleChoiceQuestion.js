import React from 'react'

import MultipleChoiceQuestion from 'gatsby-theme-atomic-design/src/templates/MultipleChoiceQuestion'

import NavLeft from '../NavLeft'
import NavRight from '../NavRight'

const MultipleChoiceQuestion2 = ({ navigate, next, options = [], ...props }) =>
  <MultipleChoiceQuestion
    {...props}
    NavLeft={() => <NavLeft onClick={() => navigate(-1)} />}
    NavRight={() => props.status === 'optional' && next ? <NavRight onClick={() => navigate(next)} /> : null}
    options={options.filter(option => option.active)}
    onSubmit={data => navigate(next, data)}
  />

export default MultipleChoiceQuestion2
