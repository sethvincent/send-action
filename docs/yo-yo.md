# Using send-action with yo-yo.js

This example shows using send-action with [yo-yo.js](https://github.com/maxogden/yo-yo).

[![view on requirebin](http://requirebin.com/badge.png)](http://requirebin.com/?gist=a78a13e2b8ee24835665537aa94a9685)

```js
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
```
