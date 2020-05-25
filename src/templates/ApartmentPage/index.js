import React from 'react'
import { graphql } from 'gatsby'
import track from 'react-tracking'

import Helmet  from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/Microsite'
import JsonLd from './JsonLd'

function App (props) {
  const { apartment, site } = props.data.lineups
  const { seo = {} } = apartment

  return (
    <>
        <Helmet title={seo ? seo.title : apartment.name}>
          <meta name='description' content={seo ? seo.description : ''} />
          <script type='application/ld+json'>{JSON.stringify(JsonLd(apartment))}</script>
        </Helmet>
        <Layout {...site} apartment={apartment} />
    </>
  )
}

export const query = graphql`
  query getApartmentPage($id: ID! $account: ID!) {
    site {
      siteMetadata {
        title
      }
    }
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
      apartment: getApartmentById(id: $id) {
        name
        marketingWebsiteUrl
        logo {
          src: url
        }
        primaryMarket {
          market
          state {
            name
          }
          marketPage {
            slug
          }
        }
        googlePlaceId
        address {
          line1
          city
          state
          postalCode
        }
        coordinates {
          latitude: lat
          longitude: lng
        }
        priceSummary {
          bedrooms
          min {
            effectiveRent {
              min
            }
          }
          max {
            effectiveRent {
              min
            }
          }
        }
        telephone: prospectPhoneNumber
        residentPortalUrl
        onlineLeasingUrl
        awardsPhoto {
          mediaType
          src: url
        }
        defaultPhoto {
          mediaType
          src: url
        }
        mediaGallery {
          mediaType
          src: url
        }
        playlist {
          mediaType
          src: url
        }
        seo {
          title
          description
        }
        headline: shortDescription {
          description: title
          shortDescription: description
        }
        features: uniqueSellingPoints {
          icon: fontAwesome
          title
          description
        }
        neighborhood {
          description
          features {
            icon: fontAwesome
            title
            description
          }
        }
        prospectPortalUrl
        selfGuidedTourUrl
        externalDataSource {
          vendor
          id
        }
        floorplanVirtualTours {
          name
          summary
          thumbnail {
            mediaType
            src: url
            alt
          }
          src: url
        }
        communityVirtualTours {
          name
          summary
          thumbnail {
            mediaType
            src: url
            alt
          }
          src: url
        }
        externalData {
          shortDescription
          longDescription
          officeHours {
            Day: day
            OpenTime: openTime
            CloseTime: closeTime
          }
          amenities {
            type
            title
            description
            isFeatured
            isPublished
            icon: fontAwesome
          }
          specials {
            isActive
            title
            description
            footer
            startDate
            endDate
          }
        }
        nearbyCommunities: nearby(limit: 3) {
          ...ApartmentFields
        }
        social {
          icon: fontAwesome
          url: title
        }
      }
    }
  }
`

export default track(props => ({ apartment: props.data.lineups.apartment.name }))(App)