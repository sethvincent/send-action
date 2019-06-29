const test = require('tape')

const createStore = require('../index')

test('simple sync action', function (t) {
  t.plan(2)

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
    t.ok(action === 'setItem')
    t.ok(state.items && state.items[0] && state.items[0].title && state.items[0].title === 'hi')
  }

  const send = createStore({ state, actions, onChange })
  send('setItem', { title: 'hi' })
})

test('async/await action', async function (t) {
  t.plan(3)

  function fetchItemFromSomewhere () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ title: 'hello after 100ms' })
      }, 100)
    })
  }

  const state = {
    items: []
  }

  const actions = {
    async fetchItem (state, data) {
      const item = await fetchItemFromSomewhere()
      state.items.push(item)
      return state
    }
  }

  function onChange (state, action) {
    t.ok(action === 'fetchItem')
    t.ok(state.items && state.items[0] && state.items[0].title && state.items[0].title === 'hello after 100ms')
  }

  const send = createStore({ state, actions, onChange })
  const result = await send('fetchItem')
  t.ok(result.items[0].title === 'hello after 100ms')
})

test('action with silent change', function (t) {
  t.plan(2)

  const state = {
    items: []
  }

  const actions = {
    setItem (state, data) {
      state.items.push(data)
      return state
    },
    setItemSilent (state, data) {
      state.items.push(data)
    }
  }

  function onChange (state, action) {
    t.ok(action === 'setItem')
    t.ok(state.items && state.items[0] && state.items[0].title && state.items[0].title === 'hi')
  }

  const send = createStore({ state, actions, onChange })
  send('setItem', { title: 'hi' })
  send('setItemSilent', { title: 'will not trigger onChange' })
})

test('calling non-existent action throws error', function (t) {
  t.plan(1)

  const state = {}
  const actions = {}
  function onChange (state, action) {}

  const send = createStore({ state, actions, onChange })

  try {
    send('missing', { message: 'this will throw an error' })
  } catch (err) {
    t.ok(err && err.message === 'action "missing" not available', 'error message thrown')
  }
})

test('nested actions', function (t) {
  function fetchItemFromSomewhere (state) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ title: 'hello after 100ms' })
      }, 100)
    })
  }

  const state = {
    requesting: false,
    items: []
  }

  const actions = {
    startRequest (state, data) {
      state.requesting = true
      return state
    },

    async fetchItem (state, data) {
      send('startRequest')

      try {
        return await fetchItemFromSomewhere(state).then((item) => {
          state.items.push(item)
          state.requesting = false
          return state
        })
      } catch (err) {
        // no error
      }
    }
  }

  const changes = []

  function onChange (state, action) {
    if (action === 'startRequest') {
      t.ok(state.requesting)
      t.ok(state.items.length === 0)
    } else if (action === 'fetchItem') {
      t.ok(!state.requesting)
      t.ok(state.items.length === 1)
    }

    changes.push({ state, action })

    if (changes.length === 2) {
      t.end()
    }
  }

  const send = createStore({ state, actions, onChange })
  send('fetchItem')
})

test('handle error', function (t) {
  function fetchItemFromSomewhere () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('not allowed'))
      }, 100)
    })
  }

  const state = {
    error: null,
    items: []
  }

  const actions = {
    async fetchItem (state, data) {
      try {
        await fetchItemFromSomewhere().then((item) => {
          state.items.push(item)
          return state
        })
      } catch (err) {
        state.error = err.message
        return state
      }
    }
  }

  function onChange (state, action) {
    t.ok(state.error === 'not allowed')
    t.end()
  }

  const send = createStore({ state, actions, onChange })
  send('fetchItem')
})
