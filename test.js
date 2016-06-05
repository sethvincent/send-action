var test = require('tape')
var sendAction = require('./index')

test('create a store', function (t) {
  var send = sendAction({
    onaction: function (action, state) {
      if (action.type === 'example') {
        return { example: true }
      }
    },
    onchange: function (action, state) {
      t.ok(action)
      t.ok(state)
      t.ok(state.example)
    }
  })

  send('example')
  t.end()
})

test('missing options fails', function (t) {
  try {
    sendAction()
  } catch (err) {
    t.ok(err)
    t.equal(err.message, 'options required')
  }

  t.end()
})

test('initial state', function (t) {
  var send = sendAction({
    onaction: function (action, state) {},
    onchange: function (action, state) {},
    state: {
      example: true
    }
  })

  var state = send.state()
  t.ok(state)
  t.ok(state.example)
  t.end()
})

test('get state', function (t) {
  var send = sendAction({
    onaction: function modifier (action, state) {
      if (action.type === 'example') {
        return { example: action.example }
      }
    },
    onchange: function (action, state) {
      t.ok(state)
      t.equal(state.example, false)
    },
    state: {
      example: true
    }
  })

  send({ type: 'example', example: false })
  t.end()
})

test('onchange returns entire newState', function (t) {
  var send = sendAction({
    state: {
      a: 123,
      b: 456
    },
    onaction: function modifier (action, state) {
      return { b: action.value }
    },
    onchange: function (params, newState, oldState) {
      t.ok(newState.a, 'state has no property "a"')
    }
  })

  send({ value: 789 })
  t.end()
})

test('only call onchange if state actually changed', function (t) {
  t.plan(1)

  var send = sendAction({
    state: {
      value: 1
    },
    onaction: function modifier (action, state) {
      if (action.type === 'change') {
        return { value: action.value }
      } else if (action.type === 'no-change') {
        return state
      }
    },
    onchange: function (params, newState, oldState) {
      t.equal(newState.value, 2)
    }
  })

  send('change', { value: 2 })
  send('no-change')
})
