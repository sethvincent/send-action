var test = require('tape')
var sendAction = require('./index')

test('create a store', function (t) {
  t.plan(2)

  var send = sendAction({
    onAction: function (state, action, data) {
      console.log('action', action, 'data', data)
      if (action === 'example') {
        return { example: true }
      }
    },
    onChange: function (state, prev) {
      t.ok(state.example)
      t.ok(state)
    }
  })

  send('example')
})

test('missing options fails', function (t) {
  t.plan(1)

  try {
    sendAction()
  } catch (err) {
    t.ok(err)
  }
})

test('initial state', function (t) {
  t.plan(2)

  var send = sendAction({
    onAction: function (state, action, data) {},
    onChange: function (state, prev) {},
    state: {
      example: true
    }
  })

  var state = send.state()
  t.ok(state)
  t.ok(state.example)
})

test('get state', function (t) {
  t.plan(2)

  var send = sendAction({
    onAction: function (state, action, data) {
      if (action === 'example') {
        return { example: data }
      }
    },
    onChange: function (state, prev) {
      t.ok(state)
      t.equal(state.example, false)
    },
    state: {
      example: true
    }
  })

  send('example', false)
})

test('values returned in onAction extend state', function (t) {
  t.plan(3)

  var send = sendAction({
    state: {
      a: 123,
      b: 456
    },
    onAction: function (state, action, data) {
      if (action === 'c') return { c: data }
    },
    onChange: function (state, prev) {
      t.ok(state.a, 'state has property "a"')
      t.ok(state.b, 'state has property "b"')
      t.equal(state.c, 789)
    }
  })

  send('c', 789)
})

test('only call onChange if state actually changed', function (t) {
  t.plan(1)

  var send = sendAction({
    state: {
      value: 1
    },
    onAction: function (state, action, data) {
      if (action === 'change') {
        return { value: data }
      }
    },
    onChange: function (state, prev) {
      t.equal(state.value, 2)
    }
  })

  send('change', 2)
  send('no-change')
})
