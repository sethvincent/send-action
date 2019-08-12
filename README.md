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
[conduct-url]: CODE_OF_CONDUCT.md

## Install

```sh
npm install send-action
```

## Minimal example

```js
var createStore = require('send-action')

var state = {
  items: []
}

var actions = {
  setItem: function (state, data) {
    state.items.push(data)
    return state
  }
}

function onChange (state, action) {
  // render app
  console.log(state, action)
}

var send = createStore({
  state: state,
  actions: actions,
  onChange: onChange
})

send('setItem', { title: 'hi' })
```

## See also
- [choo](https://github.com/yoshuawuyts/choo)
  - The early versions of choo used send-action! Now choo uses an event emitter approach for managing state which is very cool yet slightly more verbose than I prefer.
- [unistore](https://github.com/developit/unistore) - The latest version of send-action looks a little more like unistore than it did before. Some differences of send-action include:
  - the source is not transpiled before publish and sticks to es5
  - state is mutable, so there's no `setState` function
  - managing action functions is a little simpler
  - not returning state from an action avoids triggering the `onChange` handler
  - no way to subscribe listeners, only the `onChange` handler
  - if you use react, you'll have an easier time using unistore as it comes with a `Provider` component

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

Help keep this project open and inclusive. Please read and follow the [code of conduct](CODE_OF_CONDUCT.md)

## Changelog

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Contact

- **issues** – Please open issues in the [issues queue](https://github.com/sethvincent/send-action/issues)

## License

[MIT](LICENSE.md)
