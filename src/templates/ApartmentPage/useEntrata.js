import { useState, useEffect } from 'react'

import { getDates } from '../WidgetPage/utils'

const useEntrata = propertyId => {
  const [scheduleTimes, setScheduleTimes] = useState([])
  const [duration, setDuration] = useState(30)

  useEffect(() => {
    fetch('/.netlify/functions/entrata-get-appointment-times', {
      method: 'POST',
      body: JSON.stringify({ propertyId }),
    })
      .then(res => res.json())
      .then(json => {
        const appointmentLength = json.result.propertyCalendarSettings.appointmentLength || 30
        setDuration(appointmentLength)

        const { availableHour = [] } = json.result.propertyCalendarAvailability.availableHours
        setScheduleTimes(getDates(availableHour, appointmentLength))
      })
  }, [])

  return {
    scheduleTimes,
    onSubmit: form =>
      fetch('/.netlify/functions/entrata-send-lead', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          duration,
          propertyId,
        }),
      }),
  }
}

export default useEntrata