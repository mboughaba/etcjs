# etcjs
[![Build Status](TDOD)](TODO)

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
