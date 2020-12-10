import React from 'react'

import useLocalStorage from './useLocalStorage.js'

const Route = ({ location, navigate, uri, component: Component, ...props }) => {
  const basepath = location.pathname.replace(new RegExp(`${ props.path }$`), '')
  const [store, setStore] = useLocalStorage('store', { user: {} })

  const navigate2 = (to, data) => {
    if (data) {
      const key = location.pathname.replace(/^\//, '') || 'index'
      setStore({
        ...store,
        user: {
          firstName: data.firstName || store.user.firstName,
          lastName: data.lastName || store.user.lastName,
          email: data.email || store.user.email,
          phone: data.phone || store.user.phone,
        },
        [key]: data,
      })
    }

    if (to === -1) navigate(-1)
    else navigate(`${ basepath }${ to }`)
  }

  return <Component navigate={navigate2} {...props}/>
}

export default Route
