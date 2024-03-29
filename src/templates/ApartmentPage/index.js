import React from 'react'
import { graphql } from 'gatsby'
import { useTracking } from 'react-tracking'

import Helmet  from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/QuickView'
import JsonLd from './JsonLd'
import Widget from './Widget'

import useLeadManager from '../../hooks/useLeadManager'
import useLocalStorage from '../../hooks/useLocalStorage'
import { ID, hash } from '../../hooks/utils'

export const Head = ({ data }) => {
  const { apartment } = data.lineups
  const { seo = {} } = apartment
  const title = seo ? seo.title : apartment.name
  return <Helmet title={title}>
    <meta name='description' content={seo ? seo.description : ''} />
    <script type='application/ld+json'>{JSON.stringify(JsonLd(apartment))}</script>
  </Helmet>
}

const App = ({ data, location, pageContext }) => {
  const [store] = useLocalStorage('store', { user: {} })

  const { apartment, site } = data.lineups
  const { seo = {} } = apartment
  if (!apartment.externalData.officeHours)
    apartment.externalData.officeHours = []

  const title = seo ? seo.title : apartment.name
  const trackingData = { title, page: location.pathname, apartment: apartment.name }

  const dispatchOnMount = () => {
    return {
      event: 'custom.page.load',
      siteType: 'brand site',
      pageType: 'quick view',
      apartment: apartment.name,
      market: apartment.primaryMarket.market || '(not set)',
      submarket: apartment.primaryMarket.submarket || '(not set)',
    }
  }

  const { trackEvent } = useTracking({}, { dispatchOnMount })

  const [widget] = data.admin.apartment.result.widgets.filter(widget => ['published', 'archived'].indexOf(widget.status) > -1)
  const bubble = data.admin.apartment.result.widgets.find(widget => widget.status === 'published' && widget.showOnWebsite)
  const {
    scheduleTimes,
    submitContactUs,
    submitScheduleTour,
  } = useLeadManager({
    source: 'Quick View',
    account: pageContext.account,
    apartment,
    ...widget,
  })
  const props = {
    galleryUrl: location.pathname.replace(/\/?$/, '') + '/gallery/',
    scheduleTimes,
    onSubmit: form => {
      const {
        firstName,
        lastName,
        email,
        phone,
        question,
        day,
        time,
      } = form

      const emailHash = hash(email)
      trackEvent({
        event: 'quickview_lead',
        account: pageContext.account,
        apartment: apartment.name,
        user_email_hash: emailHash,
        question,
        tour_requested_day: day && day.value,
        tour_requested_time: time && time.value,
      })

      const user = {
        id: store.user.id || ID(),
        firstName,
        lastName,
        email,
        phone,
        emailHash,
      }

      trackEvent({
        event: 'custom.form.submit',
        action: 'submit',
        tour: {
          day: day && day.value,
          time: time && time.value,
        },
        hashedEmail: emailHash,
        hashedPhone: hash(phone),
        userId: user.id,
      })

      if (day && time) {
        return submitScheduleTour({
          user,
          day,
          time,
          'schedule-tour': {
            day: day && day.value,
            time,
          },

        }).then(({ response }) => {
          trackEvent({
            event: 'custom.form.complete',
            action: 'complete',
            crmId: response.code === 200
              ? response.result.prospects.prospect[0].applicationId
              : undefined,
          })
        })
      } else if (question) {
        return submitContactUs({
          user,
          'contact-us': {
            question,
          },
          question: `${ firstName } asked this question: ${ question }`,

        }).then(({ response }) => {
          trackEvent({
            event: 'custom.form.complete',
            action: 'complete',
            crmId: response.code === 200
              ? response.result.prospects.prospect[0].applicationId
              : undefined,
          })
        })
      }
    }
  }

  return (
    <>
        <Layout trackingData={trackingData} {...site} apartment={apartment} {...props} />
        {bubble ? <Widget {...bubble} /> : null}
    </>
  )
}

export const query = graphql`
  query getApartmentPage($id: ID! $account: ID! $publicId: String) {
    admin {
      apartment(input: { filter: { publicId: { _eq: $publicId } } }) {
        result {
          widgets {
            ...WidgetFields
          }
        }
      }
    }
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
      apartment: getApartmentById(id: $id) {
        ...ApartmentFields2
      }
    }
  }
`

export default App
