
  var css = require('sheetify')
  var minidocs = require('minidocs')
  var app = minidocs({"title":"send-action","contents":[{"depth":1,"name":"overview"},{"depth":2,"name":"about","key":"about","link":"/send-action/about"},{"depth":1,"name":"examples"},{"depth":2,"name":"yo-yo.js","key":"yo-yo","link":"/send-action/yo-yo"},{"depth":2,"name":"virtual-dom","key":"virtual-dom","link":"/send-action/virtual-dom"},{"depth":2,"name":"react","key":"react","link":"/send-action/react"}],"markdown":"/Users/sdv/workspace/sethvincent/send-action/docs","initial":"about","basedir":"/send-action","dir":"/Users/sdv/workspace/sethvincent/send-action","routes":{"index":"/","about":"/about/","yo-yo":"/yo-yo/","virtual-dom":"/virtual-dom/","react":"/react/"},"html":{"about":"<h1 id=\"about-send-action\">About send-action</h1>\n<p><code>send-action</code> is meant to be the smallest, simplest redux-like state management library. The focus is on providing a concise method for triggering actions, and on avoiding complex middleware &amp; development dependencies.</p>\n<p>The API is significantly different from redux, but the pattern is similar. </p>\n<p>Using <code>send-action</code> you trigger actions, modify state based on those actions, and listen to the changes to render your application.</p>\n<h2 id=\"source-code\">Source code</h2>\n<ul>\n<li><a href=\"https://github.com/sethvincent/send-action\">GitHub repo</a></li>\n<li><a href=\"http://npmjs.com/send-action\">send-action on npm</a></li>\n</ul>\n<h2 id=\"install-using-npm\">Install using npm</h2>\n<pre><code class=\"lang-sh\">npm i --save send-action\n</code></pre>\n<p>If you don&#39;t have node &amp; npm installed already, install the latest from <a href=\"https://nodejs.org\">nodejs.org</a>.</p>\n<h2 id=\"basic-example\">Basic example</h2>\n<pre><code class=\"lang-js\"><span class=\"hljs-keyword\">var</span> sendAction = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'send-action'</span>)\n\n<span class=\"hljs-comment\">/*\n* Create send function.\n*/</span>\n<span class=\"hljs-keyword\">var</span> send = sendAction({\n  onaction: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\">action, state</span>) </span>{\n    <span class=\"hljs-comment\">// modify the state based on actions</span>\n    <span class=\"hljs-keyword\">return</span> state\n  },\n  onchange: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\">action, state, oldstate</span>) </span>{\n    <span class=\"hljs-comment\">// render your application</span>\n    <span class=\"hljs-built_in\">console</span>.log(action, state, oldstate)\n  },\n  state: {}\n})\n\n<span class=\"hljs-comment\">/*\n* Send an action to the store\n*/</span>\nsend({ type: <span class=\"hljs-string\">'example'</span> value: <span class=\"hljs-string\">'cool'</span> })\n</code></pre>\n","yo-yo":"<h1 id=\"using-send-action-with-yo-yo-js\">Using send-action with yo-yo.js</h1>\n<p>This example shows using send-action with <a href=\"https://github.com/maxogden/yo-yo\">yo-yo.js</a>.</p>\n<p><a href=\"http://requirebin.com/?gist=a78a13e2b8ee24835665537aa94a9685\"><img src=\"http://requirebin.com/badge.png\" alt=\"view on requirebin\"></a></p>\n<pre><code class=\"lang-js\"><span class=\"hljs-keyword\">var</span> yo = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'yo-yo'</span>)\n<span class=\"hljs-keyword\">var</span> sendAction = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'send-action'</span>)\n\n<span class=\"hljs-comment\">/*\n* Create send function.\n*/</span>\n<span class=\"hljs-keyword\">var</span> send = sendAction({\n  onaction: onaction,\n  onchange: onchange,\n  state: { value: <span class=\"hljs-string\">'ok'</span> }\n})\n\n<span class=\"hljs-comment\">/*\n* Set up the action handler to modify state based on the actions triggered\n*/</span>\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">onaction</span> (<span class=\"hljs-params\">action, state</span>) </span>{\n  <span class=\"hljs-keyword\">if</span> (action.type === <span class=\"hljs-string\">'example'</span>) {\n    <span class=\"hljs-keyword\">return</span> { value: action.value }\n  }\n}\n\n<span class=\"hljs-comment\">/*\n* Subscribe to changes to the store for rendering &amp; logging\n*/</span>\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">onchange</span> (<span class=\"hljs-params\">action, state, oldState</span>) </span>{\n  yo.update(<span class=\"hljs-built_in\">document</span>.getElementById(<span class=\"hljs-string\">'app'</span>), render(state))\n}\n\n<span class=\"hljs-comment\">/*\n* Render the html of the app with yo-yo\n*/</span>\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">render</span> (<span class=\"hljs-params\">state</span>) </span>{\n  <span class=\"hljs-keyword\">return</span> div(state)\n}\n\n<span class=\"hljs-built_in\">document</span>.body.appendChild(render(send.state()))\n\n<span class=\"hljs-comment\">/*\n* Send an action to the store\n*/</span>\nsend({ type: <span class=\"hljs-string\">'example'</span>, value: <span class=\"hljs-string\">'cool'</span> })\n\n<span class=\"hljs-comment\">/*\n* Alternate `send` syntax\n*/</span>\nsend(<span class=\"hljs-string\">'example'</span>, { value: <span class=\"hljs-string\">'awesome'</span> })\n\n<span class=\"hljs-comment\">/*\n* Create a component to render\n*/</span>\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">div</span> (<span class=\"hljs-params\">state</span>) </span>{\n  <span class=\"hljs-keyword\">return</span> yo<span class=\"hljs-string\">`&lt;div id=\"app\"&gt;<span class=\"hljs-subst\">${state.value}</span>&lt;/div&gt;`</span>\n}\n</code></pre>\n","virtual-dom":"<h1 id=\"using-send-action-with-virtual-dom\">Using send-action with virtual-dom</h1>\n<p>This example shows using send-action with <a href=\"http://npmjs.com/virtual-dom\">virtual-dom</a> and <a href=\"http://npmjs.com/virtual-raf\">virtual-raf</a>.</p>\n<p><a href=\"http://requirebin.com/?gist=10bb9ef42774c3fdbaa07b3e53582abe\"><img src=\"http://requirebin.com/badge.png\" alt=\"view on requirebin\"></a></p>\n<pre><code class=\"lang-js\"><span class=\"hljs-keyword\">var</span> sendAction = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'send-action'</span>)\n<span class=\"hljs-keyword\">var</span> vraf = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'virtual-raf'</span>)\n<span class=\"hljs-keyword\">var</span> vdom = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'virtual-dom'</span>)\n<span class=\"hljs-keyword\">var</span> h = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'virtual-dom/h'</span>)\n\n<span class=\"hljs-comment\">/*\n* Create send function.\n*/</span>\n<span class=\"hljs-keyword\">var</span> send = sendAction({\n  onaction: onaction,\n  onchange: onchange,\n  state: { value: <span class=\"hljs-string\">'ok'</span> }\n})\n\n<span class=\"hljs-comment\">/*\n* Set up the action handler to modify state based on the actions triggered\n*/</span>\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">onaction</span> (<span class=\"hljs-params\">action, state</span>) </span>{\n  <span class=\"hljs-keyword\">if</span> (action.type === <span class=\"hljs-string\">'example'</span>) {\n    <span class=\"hljs-keyword\">return</span> { value: action.value }\n  }\n}\n\n<span class=\"hljs-comment\">/*\n* Subscribe to changes to the store for rendering &amp; logging\n*/</span>\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">onchange</span> (<span class=\"hljs-params\">action, state, oldState</span>) </span>{\n  tree.update(state)\n}\n\n<span class=\"hljs-comment\">/*\n* Render the html of the app with virtual-dom\n*/</span>\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">render</span> (<span class=\"hljs-params\">state</span>) </span>{\n  <span class=\"hljs-keyword\">return</span> div(state)\n}\n\n<span class=\"hljs-comment\">/* initial render */</span>\n<span class=\"hljs-keyword\">var</span> tree = vraf(send.state(), render, vdom)\n<span class=\"hljs-built_in\">document</span>.body.appendChild(tree.render())\n\n<span class=\"hljs-comment\">/*\n* Send an action to the store\n*/</span>\nsend({ type: <span class=\"hljs-string\">'example'</span>, value: <span class=\"hljs-string\">'cool'</span> })\n\n<span class=\"hljs-comment\">/*\n* Alternate `send` syntax\n*/</span>\nsend(<span class=\"hljs-string\">'example'</span>, { value: <span class=\"hljs-string\">'awesome'</span> })\n\n<span class=\"hljs-comment\">/*\n* Create a component to render\n*/</span>\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">div</span> (<span class=\"hljs-params\">state</span>) </span>{\n  <span class=\"hljs-keyword\">return</span> h(<span class=\"hljs-string\">'div#app'</span>, state.value)\n}\n</code></pre>\n","react":"<h1 id=\"using-send-action-with-react\">Using send-action with React</h1>\n<p>This example shows using send-action with <a href=\"http://npmjs.com/react\">react</a>.</p>\n<p><a href=\"http://requirebin.com/?gist=8127eec940113306f6c511fd0d3148d1\"><img src=\"http://requirebin.com/badge.png\" alt=\"view on requirebin\"></a></p>\n<pre><code class=\"lang-js\"><span class=\"hljs-keyword\">var</span> sendAction = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'send-action'</span>)\n<span class=\"hljs-keyword\">var</span> dom = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'react-dom'</span>)\n<span class=\"hljs-keyword\">var</span> react = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'react'</span>)\n\n<span class=\"hljs-comment\">/*\n* Create send function.\n*/</span>\n<span class=\"hljs-keyword\">var</span> send = sendAction({\n  onaction: onaction,\n  onchange: onchange,\n  state: { value: <span class=\"hljs-string\">'ok'</span> }\n})\n\n<span class=\"hljs-keyword\">var</span> appEl = <span class=\"hljs-built_in\">document</span>.body.appendChild(<span class=\"hljs-built_in\">document</span>.createElement(<span class=\"hljs-string\">'div'</span>))\nappEl.id = <span class=\"hljs-string\">'app'</span>\n\n<span class=\"hljs-comment\">/*\n* Set up the action handler to modify state based on the actions triggered\n*/</span>\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">onaction</span> (<span class=\"hljs-params\">action, state</span>) </span>{\n  <span class=\"hljs-keyword\">if</span> (action.type === <span class=\"hljs-string\">'example'</span>) {\n    <span class=\"hljs-keyword\">return</span> { value: action.value }\n  }\n}\n\n<span class=\"hljs-comment\">/*\n* Subscribe to changes to the store for rendering &amp; logging\n*/</span>\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">onchange</span> (<span class=\"hljs-params\">action, state, oldState</span>) </span>{\n  render(state)\n}\n\n<span class=\"hljs-comment\">/*\n* Render the html of the app with react\n*/</span>\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">render</span> (<span class=\"hljs-params\">state</span>) </span>{\n  <span class=\"hljs-keyword\">return</span> dom.render(react.createElement(div, state), appEl)\n}\n\n<span class=\"hljs-comment\">/*\n* Send an action to the store\n*/</span>\nsend({ type: <span class=\"hljs-string\">'example'</span>, value: <span class=\"hljs-string\">'cool'</span> })\n\n<span class=\"hljs-comment\">/*\n* Alternate `send` syntax\n*/</span>\nsend(<span class=\"hljs-string\">'example'</span>, { value: <span class=\"hljs-string\">'awesome'</span> })\n\n<span class=\"hljs-comment\">/*\n* Create a component to render\n*/</span>\n<span class=\"hljs-keyword\">var</span> div = react.createClass({\n  render: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\"></span>) </span>{\n    <span class=\"hljs-keyword\">return</span> react.createElement(<span class=\"hljs-string\">'div'</span>, {}, <span class=\"hljs-keyword\">this</span>.props.value)\n  }\n})\n</code></pre>\n"}})
  
  app.start('#choo-root')
  