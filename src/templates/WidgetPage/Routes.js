import React from 'react'
import { Router } from '@reach/Router'

import Intro from './Routes/Intro'
import MultipleChoiceQuestion from './Routes/MultipleChoiceQuestion'
import GuestCard from './Routes/GuestCard'
import Loading from './Routes/Loading'
import ScheduleTour from './Routes/ScheduleTour'
import ContactUs from './Routes/ContactUs'
import Confirmation from './Routes/Confirmation'
import Story from './Routes/Story'
import MoveInDate from './Routes/MoveInDate'

import useLocalStorage from './useLocalStorage.js'
import Route from './Route'

import loading from './loading.json'
import confirmation from './confirmation.json'

const formatPhone = str => `tel:+1${ str.replace(/\D/g, '') }`

const Routes = ({
  basepath,
  info,
  intro,
  bedrooms,
  floorplanAmenities,
  communityAmenities,
  story,
  neighborhoodFeatures,
  contactUs,
}) => {
  const [store] = useLocalStorage('store', { user: {} })

  const onCall = () => window.open(formatPhone(info.apartment.prospectPhoneNumber))

  return <Router id='widget-focus-wrapper' basepath={basepath}>
    <Route
      path='/'
      component={Intro}
      {...intro}
      next='/bedrooms'
    />
    <Route
      path='/bedrooms'
      component={MultipleChoiceQuestion}
      {...bedrooms}
      next='/move-in'
    />
    <Route
      path='/move-in'
      component={MoveInDate}
      next='/floorplan-amenities'
    />
    <Route
      path='/floorplan-amenities'
      component={MultipleChoiceQuestion}
      {...floorplanAmenities}
      next='/community-amenities'
    />
    <Route
      path='/community-amenities'
      component={MultipleChoiceQuestion}
      {...communityAmenities}
      next='/neighborhood-features'
    />
    <Route
      path='/neighborhood-features'
      component={MultipleChoiceQuestion}
      {...neighborhoodFeatures}
      next='/guest-card'
    />
    <Route
      path='/guest-card'
      component={GuestCard}
      {...store.user}
      title='To help us personalize the experience, tell us a little about you'
      next='/loading'
      privacyPolicyUrl={info.privacyPolicyUrl}
    />
    <Route
      path='/loading'
      component={Loading}
      lottie={loading}
      title='Give us a moment while we customize a tour for you!'
      next='/story'
    />
    <Route
      path='/story'
      component={Story}
      theme={info.account.theme}
      data={story.data}
      onCall={onCall}
    />
    <Route
      path='/schedule-tour'
      component={ScheduleTour}
      {...store.user}
      next='/schedule-tour-confirmation'
    />
    <Route
      path='/schedule-tour-confirmation'
      component={Confirmation}
      lottie={confirmation}
      title='Thank you for scheduling a tour!'
      subtitle='Looking forward to meeting you.'
      onCall={onCall}
    />
    {/* FIXME: contactUs.emailTo should be required */}
    <Route
      path='/contact-us'
      component={ContactUs}
      to={contactUs.emailTo || 'lucas@lineups.io'}
      from={store.user ? store.user.email : ''}
      question='Have a question we have an answer?'
      privacyPolicyUrl={info.privacyPolicyUrl}
      next='/contact-us-confirmation'
    />
    <Route
      path='/contact-us-confirmation'
      component={Confirmation}
      lottie={confirmation}
      title='Thank you !!! Someone will be in touch soon.'
      onCall={onCall}
    />
  </Router>
}

export default Routes
