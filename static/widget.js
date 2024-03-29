const storageAvailable = function(type) {
  var storage
  try {
    storage = window[type]
    var x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  }
  catch(e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0)
  }
}

const storage = {
  location: 'sessionStorage',
  key: 'lineups___widget___state',
}

const getState = function() {
  const item = storageAvailable(storage.location) && window[storage.location].getItem(storage.key)
  try {
    return item ? JSON.parse(item) : {}
  } catch(e) {
    console.error(e)
    return {}
  }
}

const setState = function(value) {
  if (storageAvailable(storage.location)) {
    window[storage.location].setItem(storage.key, JSON.stringify(value))
  }
}

const CLASSNAME = {
  Wrapper: 'lineups___wrapper',
  Bubble: 'lineups___bubble',
  Hide: 'lineups___hide',
  IframeContainer: 'lineups___iframe-container',
  Iframe: 'lineups___iframe',
  Widget: 'lineups___widget',
  Close: 'lineups___close',
  Spinner: 'lineups___spinner lds-hourglass',
}

const createElement = function(tag, attributes) {
  const elem = document.createElement(tag)

  Object.keys(attributes || {}).forEach(function setAttribute(key) {
    elem.setAttribute(key, attributes[key])
  })

  return elem
}

class Lineups {
  constructor(intro, widget) {
    this.widget = widget

    const wrapper = createElement('div', {
      class: CLASSNAME.Wrapper,
    })

    const bubble = createElement('div', {
      class: CLASSNAME.Bubble
    })
    bubble.onclick = this.toggleOpen.bind(this)

    const span = createElement('span')

    const video = createElement('video', {
      playsInline: '',
      loop: '',
      poster: intro.poster,
      tabIndex: -1
    })
    video.oncanplay = function(e) {
      e.target.muted = true
      e.target.play()
    }

    const source = createElement('source', {
      src: intro.video
    })

    video.appendChild(source)

    bubble.appendChild(span)
    bubble.appendChild(video)

    wrapper.appendChild(bubble)

    const hide = createElement('button', {
      class: CLASSNAME.Hide,
    })
    hide.innerHTML = 'Hide'
    hide.onclick = this.toggleHide.bind(this)
    this.hide = hide

    wrapper.appendChild(hide)

    const state = getState()
    if (state.hidden) {
      wrapper.className = wrapper.className + ' hide'
      hide.innerHTML = 'Unhide'
    }

    document.body.appendChild(wrapper)
    this.wrapper = wrapper
  }

  destroy() {
    if (this.wrapper) document.body.removeChild(this.wrapper)
  }

  toggleOpen() {
    if (this.wrapper.className.match(/ open/)) this.close()
    else this.open()
  }

  toggleHide() {
    if (this.wrapper.className.match(/ hide/)) {
      this.wrapper.className = this.wrapper.className.replace(/ hide/g, '')
      this.hide.innerHTML = 'Hide'
      setState({ hidden: false })
    } else {
      this.wrapper.className = this.wrapper.className + ' hide'
      this.hide.innerHTML = 'Unhide'
      setState({ hidden: true })
    }
  }

  open() {
    if (!this.iframe) {
      const iframeContainer = createElement('div', {
        class: CLASSNAME.IframeContainer
      })

      const closeButton = createElement('button', {
        class: CLASSNAME.Close
      })
      closeButton.innerHTML = '&times;'
      closeButton.onclick = this.toggleOpen.bind(this)

      const spinner = createElement('div', {
        class: CLASSNAME.Spinner
      })

      const iframe = createElement('iframe', {
        class: CLASSNAME.Iframe,
        title: this.widget.title,
        src: this.widget.src,
      })
      iframe.onload = function() {
        iframeContainer.removeChild(spinner)
      }

      iframeContainer.appendChild(closeButton)
      iframeContainer.appendChild(spinner)
      iframeContainer.appendChild(iframe)

      this.wrapper.appendChild(iframeContainer)
      this.iframe = iframe
    }

    this.wrapper.className = this.wrapper.className + ' open'
    if (this.iframe && this.iframe.postMessage) this.iframe.postMessage('open')

    this.wrapper.className = this.wrapper.className.replace(/ hide/g, '')
    this.hide.innerHTML = 'Hide'
    setState({ hidden: false })
  }

  close() {
    this.wrapper.className = this.wrapper.className.replace(/ open/g, '')
    if (this.iframe && this.iframe.postMessage) this.iframe.postMessage('close')
  }
}
