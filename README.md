# send-action

A tiny module for managing state.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[npm-image]: https://img.shields.io/npm/v/send-action.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/send-action
[travis-image]: https://img.shields.io/travis/sethvincent/send-action.svg?style=flat-square
[travis-url]: https://travis-ci.org/sethvincent/send-action
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CONDUCT.md

## About

`send-action` is meant to be the smallest unidirectional state management module. The focus is on providing a concise method for triggering actions, and on avoiding complex plugins, middleware, & development dependencies.

## Install

```sh
npm install --save send-action
```

## Minimal example

```js
var sendAction = require('send-action')

/*
* Create send function.
*/
var send = sendAction({
  onAction: function (state, action, data) {
    // return a new object based on the action
    if (action === 'example') {
      return { example: data }
    }
  },
  onChange: function (state, prev) {
    // render your application
    console.log(state, prev)
  },
  state: {
    example: null
  }
})

/*
* Send an action to change the state
*/
send('example', 'cool')
```

## Overview

There are a few main parts of send-action to explore:

### The `send` function

You create the `send` function by calling `sendAction`:

```js
var sendAction = require('send-action')

/*
* Create send function
*/
var send = sendAction({
  onAction: function (state, action, data) {},
  onChange: function (state, prev) {},
  state: {}
})
```

You can trigger state changes by calling the `send` function.

`send` takes two arguments: `action` and `data`.

The `action` argument must be a string.

The `data` argument can be most any JavaScript value. A string, number, array or object would all be a reasonable value to use.

Calling `send` looks like this:

```js
send('example', { value: 'some data' })
```

Calling `send` triggers the `onAction` handler.

You might handle the above `send` call in `onAction` like this:

```js
function onAction (state, action, data) {
  if (action === 'example') {
    return { example: data.value }
  }
}
```

### The `onAction` function

The `onAction` function is where you handle incoming actions and use that data to change the state.

It receives three arguments: `state`, `action`, `data`.

The `state` object is a copy of the current state. You can modify this object directly without making side effects to the internal state.

The `action` is the string used as the first argument when calling `send`.

The `data` is the value passed as the second argument to `send`.

The `onAction` function is only called as a response to the `send` function.

#### Returning data synchronously

The logic inside of `onAction` must remain synchronous.

The state will only be changed if `onAction` returns an object.

If an object is returned from `onAction`:

- it will be used to extend the internal state object
- the `onChange` function will be called

If an object is **not** returned, the `onChange` function will not be called, so the application won't rerender.

### The `onChange` function

The `onChange` function should contain the logic to render your application.

It receives two arguments: `state`, `prev`.

`state` is a copy of the internal state.

`prev` is a copy of the internal state **before** the last action was sent.

### The `state` object

You can put any data into the `state` object.

Note that it is extended shallowly. If you have an array inside the state it won't be extended. You need to handle that kind of modification carefully in the `onAction` function.

### Handling async actions

send-action doesn't handle async actions for you in a strict way. This can be a downside if you're building a complex application, and may be a sign that another state management module may best serve your purpose.

However, if you're building a small app with only a few types of state changes and a minimal amount of async actions, here's an approach you might take:

**1.** Create an `actions` object with methods that perform async actions and take a `done` callback to return either an error or results value

```js
var actions = {
  init: function (done) {
    document.body.addEventListener('click', done)
  }
}

module.exports = actions
```

**2.** In your application, use the `actions` methods to trigger the async actions and use the return values to update state with `send`:

```js
actions.init(function (e) {
  send('click', e)
})
```

It's clear that this approach won't scale well if your application is big and/or if you're working in a large team, but in situations where you're only hitting a couple of API endpoints, I like the simplicity of this.

## Examples with common UI modules

- [yo-yo.js](/docs/yo-yo.md)
- [react](/docs/react.md)
- [virtual-dom](/docs/virtual-dom.md)

## See also
- [choo](https://github.com/yoshuawuyts/choo)
- [barracks](https://github.com/yoshuawuyts/barracks)
- [nanoraf](https://github.com/yoshuawuyts/nanoraf)
- [yo-yo](https://github.com/maxogden/yo-yo)

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

It is important that this project contributes to a friendly, safe, and welcoming environment for all. Read this project's [code of conduct](CONDUCT.md)

## Changelog

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Contact

- **issues** – Please open issues in the [issues queue](https://github.com/sethvincent/send-action/issues)
- **twitter** – Have a question? [@sethdvincent](https://twitter.com/sethdvincent)
- **email** – Need in-depth support via paid contract? Send an email to sethvincent@gmail.com

## License

[MIT](LICENSE.md)
