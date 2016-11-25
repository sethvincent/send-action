var sendAction = require('send-action')
var vraf = require('virtual-raf')
var vdom = require('virtual-dom')
var h = require('virtual-dom/h')

/*
* Create send function.
*/
var send = sendAction({
  onAction: onAction,
  onChange: onChange,
  state: { value: 'ok' }
})

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
  tree.update(state)
}

/*
* Render the html of the app with virtual-dom
*/
function render (state) {
  return div(state)
}

/* initial render */
var tree = vraf(send.state(), render, vdom)
document.body.appendChild(tree.render())

/*
* Send an action to modify the state
*/
send('example', 'awesome')

/*
* Create a component to render
*/
function div (state) {
  return h('div#app', state.value)
}
