# send-action

A simple state container. 

[![npm](https://img.shields.io/npm/v/send-action.svg)](http://npmjs.com/send-action)

## Resources
- [Docs](http://sethvincent.com/send-action)
- [Examples](https://github.com/sethvincent/send-action/tree/master/examples)

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
    // return a new object based on the action
    if (action.type === 'example') {
      return { example: action.value }
    }
  },
  onchange: function (action, state, oldstate) {
    // render your application
    console.log(action, state, oldstate)
  },
  state: {
    example: null
  }
})

/*
* Send an action to the store
*/
send({ type: 'example', value: 'ok' })

/*
* Alternate `send` syntax
*/
send('example', { value: 'cool' })
```

## Using send-action with xtend

You may want to use a module like [xtend](http://npmjs.com/xtend) to create new objects by extending the existing state.

```js
var xtend = require('xtend')
var sendAction = require('send-action')

/*
* Create send function.
*/
var send = sendAction({
  onaction: function (action, state) {
    // return a new object based on the action using xtend
    if (action.type === 'example') {
      return xtend(state, { example: action.value })
    }
  },
  onchange: function (action, state, oldstate) {
    // render your application
    console.log(action, state, oldstate)
  },
  state: {
    example: null
  }
})
```

## Examples with common UI modules

- [yo-yo.js](/docs/yo-yo.md)
- [react](/docs/react.md)
- [virtual-dom](/docs/virtual-dom.md)

## See also
- [choo](https://github.com/yoshuawuyts/choo)
- [barracks](https://github.com/yoshuawuyts/barracks)
- [nanoraf](https://github.com/yoshuawuyts/nanoraf)
- [yo-yo](https://github.com/maxogden/yo-yo)

## License
[MIT](LICENSE.md)
