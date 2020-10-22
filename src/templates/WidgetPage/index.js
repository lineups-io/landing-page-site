import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Theme from 'gatsby-theme-atomic-design/src/atoms/Theme'
import VideoPlayer from 'gatsby-theme-atomic-design/src/templates/VideoPlayer'

import './index.css'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

export default ({ data }) => {
  console.log('WidgetsPage', data.admin.widget)
  const {
    styles,
    slides,
    info,
  } = data.admin.widget

  return <Theme>
    <Container>
      <VideoPlayer
        onBeginTour={() => console.log('onBeginTour')}
        onScheduleTour={() => console.log('onScheduleTour')}
        poster={slides.intro.poster}
        sources={[
          {
            src: slides.intro.video,
            type: `video/${ slides.intro.video.split('.').splice(-1) }`,
          }
        ]}
        tracks={[
          {
            kind: 'captions',
            srcLang: 'en',
            label: 'English',
            src: slides.intro.closedCaptions,
          }
        ]}
      />
    </Container>
  </Theme>
}


export const query = graphql`
  query getWidgetPageData($id: String! $account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
          pricingDisclaimer
          banner
      }
    }
    admin {
      widget(input: { id: $id }) {
        info: result {
          ...WidgetDefaultFragment
        }
        styles: result {
          ...WidgetStylesFragment
        }
        slides: result {
          ...WidgetSlidesFragment
        }
      }
    }
  }

  fragment WidgetDefaultFragment on Admin_Widget {
    _id
    createdAt
    userId
    status
    title
    description
  }

  fragment WidgetSlidesFragment on Admin_Widget {
    guestCard {
      vendor
      vendorPropertyId
      emailTo
      emailCc
    }
    contactUs {
      vendor
      vendorPropertyId
      emailTo
      emailCc
    }
    scheduleTour {
      emailTo
      emailCc
      floorplansWebsiteUrl
    }
    communicationPreferences {
      question
      options
    }
    checkpoints {
      checkpoint1
      checkpoint2
      checkpoint3
    }
    intro {
      status
      question
      poster
      video
      closedCaptions
    }
    bedrooms {
      status
      question
      minCount
      maxCount
      columns
      options
    }
    moveInDate {
      status
      question
      minCount
      maxCount
      columns
      options
    }
    floorplanAmenities {
      status
      question
      minCount
      maxCount
      columns
      options
    }
    floorplanStories {
      amenity
      heading
      subHeading
      mediaIds
    }
    communityAmenities {
      status
      question
      minCount
      maxCount
      columns
      options
    }
    communityStories {
      amenity
      heading
      subHeading
      mediaIds
    }
    neighborhoodFeatures {
      status
      question
      minCount
      maxCount
      columns
      options
    }
  }

  fragment WidgetStylesFragment on Admin_Widget {
    default {
      backgroundColor
      borderColor
      color
    }
    fab {
      backgroundColor
      borderColor
      color
      fontSize
    }
    primary {
      backgroundColor
      borderColor
      color
    }
    secondary {
      backgroundColor
      borderColor
      color
    }
    selected {
      backgroundColor
      borderColor
      color
    }
    unselected {
      backgroundColor
      borderColor
      color
    }
    disabled {
      backgroundColor
      borderColor
      color
    }
  }
`