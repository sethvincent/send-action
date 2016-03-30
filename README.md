# send-action

A simple state container.

## Install

```
npm i --save send-action
```

## About

`send-action` is meant to be the smallest, simplest redux-like state management library. The focus is on providing a concise method for triggering actions, and on avoiding complex middleware & development dependencies.

The API is significantly different from redux, but the pattern is similar. 

Using `send-action` you trigger actions, modify state based on those actions, and listen to the changes to render your application.

## Minimal example

```js
var sendAction = require('send-action')

/*
* Create send function.
*/
var send = sendAction({
  onaction: function (action, state) {
    // modify the state based on actions
    return state
  },
  onchange: function (action, state, oldstate) {
    // render your application
    console.log(action, state, oldstate)
  },
  state: {}
})

/*
* Send an action to the store
*/
send({ type: 'example' value: 'cool' })

/*
* Alternate `send` syntax
*/
send('example', { value: 'cool' })
```

## Example with [yo-yo.js](https://github.com/maxogden/yo-yo)

```js
var yo = require('yo-yo')
var sendAction = require('send-action')

/*
* Create send function.
*/
var send = sendAction({
  onaction: onaction,
  onchange: onchange,
  state: {}
})

/*
* Set up the action handler to modify state based on the actions triggered
*/
function onaction (action, state) {
  if (action.type  === 'example') {
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
  yo`<div id="app">heeeeey</div>`
}

document.body.appendChild(render(send.state()))

/*
* Send an action to the store
*/
send({ type: 'example' value: 'cool' })

/*
* Alternate `send` syntax
*/
send('example', { value: 'cool' })
```

## License
[MIT](LICENSE.md)
