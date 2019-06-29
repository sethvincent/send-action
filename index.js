var assert = require('assert')
var extend = require('xtend/mutable')

/**
* Create the `send` function by calling `sendAction`
*
* @name sendAction
* @param object options
* @param object options.state
* @param object options.actions
* @param function options.onChange
* @return {send}
*/
module.exports = function sendAction (options) {
  assert(options && typeof options === 'object', 'options object is required')
  assert(options.state && typeof options.state === 'object', 'options.state object is required')
  assert(options.actions && typeof options.actions === 'object', 'options.actions object is required')
  assert(options.onChange && typeof options.onChange === 'function', 'options.onChange function is required')

  var state = options.state
  var actions = options.actions
  var onChange = options.onChange

  /**
  * Trigger actions with the `send` function
  *
  * @name send
  * @param string actionName
  * @param {*} data
  * @return {null|object|Promise<(null|object)>}
  */
  function send (actionName, data) {
    var action = actions[actionName]
    assert(action, 'action "' + actionName + '" not available')
    assert(typeof action === 'function', 'action "' + actionName + '" must be a function')

    var result = action(state, data)

    if (!result) return

    if (result.then) {
      return result.then((newState) => {
        if (newState) {
          return change(newState, actionName)
        }
      })
    }

    return change(result, actionName)
  }

  function change (newState, actionName) {
    extend(state, newState)
    onChange(state, actionName)
    return state
  }

  function setAction (actionName, action) {
    actions[actionName] = action
  }

  send.action = setAction
  send.state = state
  return send
}
