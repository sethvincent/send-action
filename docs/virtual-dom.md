# Using send-action with virtual-dom

This example shows using send-action with [virtual-dom](http://npmjs.com/virtual-dom) and [virtual-raf](http://npmjs.com/virtual-raf).

```js
var sendAction = require('send-action')
var vraf = require('virtual-raf')
var vdom = require('virtual-dom')
var h = require('virtual-dom/h')

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
  tree.update(state)
}

/*
* Render the html of the app with yo-yo
*/
function render (state) {
  return h('div#app', state.value)
}

/* initial render */
var tree = vraf(send.state(), render, vdom)
document.body.appendChild(tree.render())

/*
* Send an action to the store
*/
send({ type: 'example', value: 'cool' })

/*
* Alternate `send` syntax
*/
send('example', { value: 'awesome' })
```