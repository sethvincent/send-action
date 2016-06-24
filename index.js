
  var insertCSS = require('insert-css')
  var css = require('sheetify')
  var minidocs = require('minidocs')({"title":"send-action","contents":{"overview":{"about":"about.md"},"examples":{"yo-yo.js":"yo-yo.md","virtual-dom":"virtual-dom.md","react":"react.md"}},"markdown":{"about":"# About send-action\n\n`send-action` is meant to be the smallest, simplest redux-like state management library. The focus is on providing a concise method for triggering actions, and on avoiding complex middleware & development dependencies.\n\nThe API is significantly different from redux, but the pattern is similar. \n\nUsing `send-action` you trigger actions, modify state based on those actions, and listen to the changes to render your application.\n\n## Source code\n- [GitHub repo](https://github.com/sethvincent/send-action)\n- [send-action on npm](http://npmjs.com/send-action)\n\n## Install using npm\n\n```sh\nnpm i --save send-action\n```\n\nIf you don't have node & npm installed already, install the latest from [nodejs.org](https://nodejs.org).\n\n## Basic example\n\n```js\nvar sendAction = require('send-action')\n\n/*\n* Create send function.\n*/\nvar send = sendAction({\n  onaction: function (action, state) {\n    // modify the state based on actions\n    return state\n  },\n  onchange: function (action, state, oldstate) {\n    // render your application\n    console.log(action, state, oldstate)\n  },\n  state: {}\n})\n\n/*\n* Send an action to the store\n*/\nsend({ type: 'example' value: 'cool' })\n```\n","react":"# Using send-action with React\n\nThis example shows using send-action with [react](http://npmjs.com/react).\n\n\n```js\nvar sendAction = require('send-action')\nvar dom = require('react-dom')\nvar react = require('react')\nvar el = react.DOM\n\n/*\n* Create send function.\n*/\nvar send = sendAction({\n  onaction: onaction,\n  onchange: onchange,\n  state: { value: 'ok' }\n})\n\nvar appEl = document.body.appendChild(document.createElement('div'))\nappEl.id = 'app'\n\n/*\n* Set up the action handler to modify state based on the actions triggered\n*/\nfunction onaction (action, state) {\n  if (action.type === 'example') {\n    return { value: action.value }\n  }\n}\n\n/*\n* Subscribe to changes to the store for rendering & logging\n*/\nfunction onchange (action, state, oldState) {\n  render(state)\n}\n\n/*\n* Render the html of the app with yo-yo\n*/\nfunction render (state) {\n  return dom.render(div(state), appEl)\n}\n\n/*\n* Send an action to the store\n*/\nsend({ type: 'example', value: 'cool' })\n\n/*\n* Alternate `send` syntax\n*/\nsend('example', { value: 'awesome' })\n\n/*\n* Create a component to render\n*/\nvar div = react.createClass({\n  render: function () {\n    return react.createElement('div#app', this.props.value)\n  }\n})\n```","virtual-dom":"# Using send-action with virtual-dom\n\nThis example shows using send-action with [virtual-dom](http://npmjs.com/virtual-dom) and [virtual-raf](http://npmjs.com/virtual-raf).\n\n```js\nvar sendAction = require('send-action')\nvar vraf = require('virtual-raf')\nvar vdom = require('virtual-dom')\nvar h = require('virtual-dom/h')\n\n/*\n* Create send function.\n*/\nvar send = sendAction({\n  onaction: onaction,\n  onchange: onchange,\n  state: { value: 'ok' }\n})\n\n/*\n* Set up the action handler to modify state based on the actions triggered\n*/\nfunction onaction (action, state) {\n  if (action.type === 'example') {\n    return { value: action.value }\n  }\n}\n\n/*\n* Subscribe to changes to the store for rendering & logging\n*/\nfunction onchange (action, state, oldState) {\n  tree.update(state)\n}\n\n/*\n* Render the html of the app with yo-yo\n*/\nfunction render (state) {\n  return div(state)\n}\n\n/* initial render */\nvar tree = vraf(send.state(), render, vdom)\ndocument.body.appendChild(tree.render())\n\n/*\n* Send an action to the store\n*/\nsend({ type: 'example', value: 'cool' })\n\n/*\n* Alternate `send` syntax\n*/\nsend('example', { value: 'awesome' })\n\n/*\n* Create a component to render\n*/\nfunction div (state) {\n  return h('div#app', state.value)\n}\n```","yo-yo":"# Using send-action with yo-yo.js\n\nThis example shows using send-action with [yo-yo.js](https://github.com/maxogden/yo-yo)\n\n```js\nvar yo = require('yo-yo')\nvar sendAction = require('send-action')\n\n/*\n* Create send function.\n*/\nvar send = sendAction({\n  onaction: onaction,\n  onchange: onchange,\n  state: { value: 'ok' }\n})\n\n/*\n* Set up the action handler to modify state based on the actions triggered\n*/\nfunction onaction (action, state) {\n  if (action.type === 'example') {\n    return { value: action.value }\n  }\n}\n\n/*\n* Subscribe to changes to the store for rendering & logging\n*/\nfunction onchange (action, state, oldState) {\n  yo.update(document.getElementById('app'), render(state))\n}\n\n/*\n* Render the html of the app with yo-yo\n*/\nfunction render (state) {\n  return div(state)\n}\n\ndocument.body.appendChild(render(send.state()))\n\n/*\n* Send an action to the store\n*/\nsend({ type: 'example', value: 'cool' })\n\n/*\n* Alternate `send` syntax\n*/\nsend('example', { value: 'awesome' })\n\n/*\n* Create a component to render\n*/\nfunction div (state) {\n  return yo`<div id=\"app\">${state.value}</div>`\n}\n```"},"initial":"about","basedir":""})
  undefined
  minidocs.start('#choo-root')
  