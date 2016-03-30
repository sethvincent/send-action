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
