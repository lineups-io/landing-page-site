import React from 'react'

import VideoWidget from 'gatsby-theme-atomic-design/src/templates/VideoWidget'

// TODO : write function
const action = str => () => console.debug(str)

const Story = ({ navigate, ...props }) =>
  <VideoWidget
    {...props}
    onCheckAvailibility={action('onCheckAvailibility')}
    onContactUs={() => navigate('/contact-us')}
    onScheduleTour={() => navigate('/schedule-tour')}
    onStoryStart={action('onStoryStart')}
    onStoryEnd={action('onStoryEnd')}
    onAllStoriesEnd={action('onAllStoriesEnd')}
  />

export default Story
