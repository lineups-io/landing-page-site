import React from 'react'

import VideoPlayer from 'gatsby-theme-atomic-design/src/templates/VideoPlayer'

const Intro = ({ navigate, next, video, closedCaptions, ...props }) =>
  <VideoPlayer
    {...props}
    sources={[
      {
        src: video,
        type: `video/${ video.split('.').splice(-1) }`,
      }
    ]}
    tracks={[
      {
        kind: 'captions',
        srcLang: 'en',
        label: 'english',
        src: closedCaptions,
       }
    ]}
    onBeginTour={() => navigate(next)}
  />

export default Intro
