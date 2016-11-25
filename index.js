var assert = require('assert')
var xtend = require('xtend')

module.exports = function sendAction (options) {
  assert.equal(typeof options, 'object', 'options object is required')

  var state = options.state || {}
  var onAction = options.onAction || options.onaction
  var onChange = options.onChange || options.onchange

  assert.equal(typeof state, 'object', 'options.state must be an object')
  assert.equal(typeof onAction, 'function', 'options.onAction function is required')
  assert.equal(typeof onChange, 'function', 'options.onChange function is required')

  function send (action, data) {
    setTimeout(function () {
      var changes = onAction(state, action, data)

      if (changes) {
        var prev = xtend({}, state)
        state = xtend(state, changes)
        onChange(state, prev)
      }
    }, 0)
  }

  send.state = function () {
    return xtend({}, state)
  }

  return send
}
