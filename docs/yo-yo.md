# Using send-action with yo-yo.js

```js
var yo = require('yo-yo')
var sendAction = require('send-action')

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
* Send an action to modify the state
*/
send('example', 'awesome')

/*
* Create a component to render
*/
function div (state) {
  return yo`<div id="app">${state.value}</div>`
}
```
