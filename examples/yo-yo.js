var yo = require('yo-yo')
var sendAction = require('send-action')

/*
* Create send function.
*/
var send = sendAction({
  onaction: onaction,
  onchange: onchange,
  state: { value: 'ok' }
})

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
  yo.update(document.getElementById('app'), render(state))
}

/*
* Render the html of the app with yo-yo
*/
function render (state) {
  return div(state)
}

document.body.appendChild(render(send.state()))

/*
* Send an action to the store
*/
send({ type: 'example', value: 'cool' })

/*
* Alternate `send` syntax
*/
send('example', { value: 'awesome' })

/*
* Create a component to render
*/
function div (state) {
  return yo`<div id="app">${state.value}</div>`
}
