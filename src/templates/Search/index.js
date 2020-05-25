import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/Search'

export default ({ data, navigate, location }) => {
  const context = {
    ...location,
    title: 'Search',
    noindex: true,
    site: data.lineups.site,
  }

  return <>
    <Helmet title={context.title}>
      {[
        { name: 'robots', content: 'noindex,nofollow' },
      ].map((props, i) => <meta key={i} {...props} />)}
    </Helmet>
    <Layout {...data.lineups.site} markets={data.lineups.markets} />
  </>
}

export const query = graphql`
  query getSearchPage($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
          pricingDisclaimer
          banner
      }
      markets: findMarkets(
        filter: { account: $account }
        sort: [["market", "1"], ["submarket", "1"]]
      ) {
        count
        items {
          ...LocationGeoSearchFields
        }
      }
    }
  }
`
