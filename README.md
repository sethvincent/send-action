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

## Examples with common UI modules

- [yo-yo.js](/docs/yo-yo.md)
- [react](/docs/react.md)
- [virtual-dom](/docs/virtual-dom.md)

## License
[MIT](LICENSE.md)
