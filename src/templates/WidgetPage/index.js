import React from 'react'
import { graphql } from 'gatsby'
import { StaticRouter, HashRouter } from 'react-router-dom'
import { useTracking } from 'react-tracking'

import Theme from 'gatsby-theme-atomic-design/src/atoms/Theme'

import Switch from './AnimatedSwitch'
import Routes from './Routes'

import './index.css'

export const Head = ({ data }) => {
  const theme = data.admin.widget.info.account.theme
  return <style id='theme-fonts'>{theme.fonts}</style>
}

const WidgetPage = ({ data, location }) => {
  const {
    styles,
    slides,
    info,
  } = data.admin.widget
  const primaryMarket = info.apartment.primaryMarket ? info.apartment.primaryMarket : info.apartment.markets[0]

  const Router = typeof window === 'undefined' ? StaticRouter : HashRouter

  const dispatchOnMount = () => {
    const hasParent = window !== window.parent
    const referrer = document.referrer
    const sameDomain = !referrer || window.location.hostname === (new URL(referrer)).hostname

    return {
      event: 'custom.page.load',
      siteType: hasParent ? 'iframe' : 'brand site',
      pageType: hasParent ? (sameDomain ? 'quick view' : 'apartment') : 'lead magnet',
      apartment: info.apartment.name,
      market: primaryMarket.market || '(not set)',
      submarket: primaryMarket.submarket || '(not set)',
    }
  }
  useTracking({}, { dispatchOnMount })

  // TODO: update components to use styles
  return <Theme theme={styles}>
      <Router location={location}>
        <Switch>
          <Routes {...slides} info={info} />
        </Switch>
      </Router>
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
        slides: result {
          ...WidgetSlidesFragment
        }
      }
    }
  }
`

export default WidgetPage
