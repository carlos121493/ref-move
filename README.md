## ref-move

----

a tool for let javascript files reference relative path to absolute;

- import '../test' => import '/<your root>/<project path>/test'
- import {test} from '../test' => import test from '/<your root>/<project path>/test'
- const test = require('../test') => const test = require('/<your root>/<project path>/test)

[![Coverage Status](https://coveralls.io/repos/github/carlos121493/ref-move/badge.svg?branch=master)](https://coveralls.io/github/carlos121493/ref-move?branch=master)
[![node](https://img.shields.io/node/v/gh-badges.svg?maxAge=2592000)](https://nodejs.org/download/)
[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000)](npm-url)
[![npm](https://img.shields.io/npm/dt/express.svg?maxAge=2592000)](npm-url)

---

[![NPM](https://nodei.co/npm-dl/https://nodei.co/npm/moment.png)](npm-url)

[npm-url]: https://www.npmjs.com/package/ref-move

## usage

---

- just pass the file path convert

```
var refMove = require('ref-move');
var path = require('path')

refMove.replaceRelative(path.join(cwd, 'tests/default-string.js'));

```

- pass the file path and convert sperate

```
var refMove = require('ref-move');
var path = require('path')
var fs = require('fs');
var content = fs.readFileSync('./package.json');

refMove.replaceRelative(path.join(cwd, 'tests/), content);

```

