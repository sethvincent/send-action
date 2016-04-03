var sendAction = require('send-action')
var dom = require('react-dom')
var react = require('react')
var el = react.DOM

/*
* Create send function.
*/
var send = sendAction({
  onaction: onaction,
  onchange: onchange,
  state: { value: 'ok' }
})

var appEl = document.body.appendChild(document.createElement('div'))
appEl.id = 'app'

/*
* Set up the action handler to modify state based on the actions triggered
*/
function onaction (action, state) {
  if (action.type === 'example') {
    return { value: action.value }
  }
}

/*
* Subscribe to changes to the store for rendering & logging
*/
function onchange (action, state, oldState) {
  render(state)
}

/*
* Render the html of the app with yo-yo
*/
function render (state) {
  var div = el.div('#app', state.value)
  return dom.render(div, appEl)
}

/*
* Send an action to the store
*/
send({ type: 'example', value: 'cool' })

/*
* Alternate `send` syntax
*/
send('example', { value: 'awesome' })
