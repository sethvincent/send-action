var sendAction = require('send-action')
var dom = require('react-dom')
var react = require('react')

/*
* Create send function.
*/
var send = sendAction({
  onAction: onAction,
  onChange: onChange,
  state: { value: 'ok' }
})

var appEl = document.body.appendChild(document.createElement('div'))
appEl.id = 'app'

/*
* Set up the action handler to modify state based on the actions triggered
*/
function onAction (state, action, data) {
  if (action === 'example') {
    return { value: data }
  }
}

/*
* Subscribe to changes to the store for rendering & logging
*/
function onChange (state, prev) {
  render(state)
}

/*
* Render the html of the app with react
*/
function render (state) {
  return dom.render(react.createElement(div, state), appEl)
}

/*
* Send an action to modify the state
*/
send('example', 'awesome')

/*
* Create a component to render
*/
var div = react.createClass({
  render: function () {
    return react.createElement('div', {}, this.props.value)
  }
})
