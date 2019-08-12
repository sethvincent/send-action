# send-action change log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

* ???

## v4.0.0

### Changed
- Rewrite to support usage that looks like the following example:
  ```js
  const state = {
    items: []
  }

  const actions = {
    setItem (state, data) {
      state.items.push(data)
      return state
    }
  }

  function onChange (state, action) {
    // render app
    console.log(state, action)
  }

  const send = createStore({ state, actions, onChange })

  send('setItem', { title: 'hi' })
  ```
- state is now mutable
- instead of using a `switch` statement of a bunch of `if`/`else` statements, actions are now defined as functions
- actions can return promises

## v3.0.0

### Added
* change log!
* contributor covenant for [code of conduct](CONDUCT.md)
* [contributing.md](CONTRIBUTING.md) file
* set up travis

### Removed
* removed redux-style `send({ type: 'actionName' })` syntax in favor of `send('actionName', data)`
* `send.event` was removed. consider creating a small thunkified wrapper around send if needed
* removed testron tests for now, and removed testron and electron-prebuilt dependencies
* temporarily removed requirebin links (considering replacing them after this version is released and requirebin issues are sorted out)

### Changed

* `onAction` function now has the signature `function onAction (state, action, data) {}`
* `onChange` function now has the signature `function onChange (state, prev) {}`
* `onAction` and `onChange` are now aliases for `onaction` and `onchange`
* `onAction` can return `null`. in that case `onChange` will not be called
* `process.nextTick` replaced with `setTimeout`
* using `assert` to validate options instead of throwing errors

## v2.0.0

### Changed

* only call onchange when state actually changes

## v1.0.0

### Added

* Initial implementation
