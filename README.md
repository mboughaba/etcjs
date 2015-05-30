# etcjs
[![Build Status](https://travis-ci.org/mboughaba/etcjs.svg?branch=master)](https://travis-ci.org/mboughaba/etcjs)[![Coverage Status](https://coveralls.io/repos/mboughaba/etcjs/badge.svg)](https://coveralls.io/r/mboughaba/etcjs)[![Dependency Status](https://david-dm.org/mboughaba/etcjs.svg)](https://david-dm.org/mboughaba/etcjs)

Simple stupid node.js configuration module

## Installation via [npm](https://npmjs.org)

```shell
NODE_ENV=%ENV% npm start
# where %ENV% is the target environment.
```

### Example
Setting up configuration for 'development' environment:

```shell
NODE_ENV=development npm start
```

### Using etcjs as a module in your node app
```javascript
var config = require(__dirname + '/../lib/config');
config(function () {
    console.info('configuration has been initialized');
});
```
