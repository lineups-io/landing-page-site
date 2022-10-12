import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/Locations'

import Header from '../components/Locations/Header'

const Page = ({ data, location, pageContext }) => {
  const title = 'Search'
  const trackingData = { title, page: location.pathname }

  return <>
    <Helmet title={title}>
      {[
        { name: 'description', content: 'Find a Home' },
        { name: 'facebook-domain-verification', content: pageContext.facebookDomainVerification },
      ].map((props, i) => <meta key={i} {...props} />)}
    </Helmet>
    <Layout trackingData={trackingData} {...data.lineups.site} markets={data.lineups.markets} header={<Header />} />
  </>
}

export const query = graphql`
  query getLocationsPage($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
          displayMarketsByState
      }
      markets: findMarkets(filter: { account: $account } sort: [["market", "1"]]) {
        count
        items {
          ...LocationFields
        }
      }
    }
  }
`

export default Page
