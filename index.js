var extend = require('xtend')

module.exports = function sendAction (options) {
  if (!options) throw new Error('options required')
  if (!options.onaction) throw new Error('options.onaction required')
  if (!options.onchange) throw new Error('options.onchange required')
  var state = options.state || {}

  function send (action, params) {
    if (typeof action === 'object') params = action
    else if (typeof action === 'string') params = extend({ type: action }, params)

    var stateUpdates = options.onaction(params, state, send)
    if (state !== stateUpdates) {
      update(params, stateUpdates)
    }
  }

  function update (params, stateUpdates) {
    var oldState = state
    state = extend(state, stateUpdates)
    options.onchange(params, state, oldState)
  }

  send.event = function sendAction_event (action, params, flag) {
    if (typeof flag === undefined) flag = true
    return function sendAction_send_thunk (e) {
      if (flag && e && e.preventDefault) e.preventDefault()
      send(action, params, flag)
    }
  }

  send.state = function sendAction_state () {
    return state
  }

  return send
}
