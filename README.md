# etcjs
[![Build Status](https://travis-ci.org/mboughaba/etcjs.svg?branch=master)](https://travis-ci.org/mboughaba/etcjs)[![Coverage Status](https://coveralls.io/repos/mboughaba/etcjs/badge.svg)](https://coveralls.io/r/mboughaba/etcjs)[![Dependency Status](https://david-dm.org/mboughaba/etcjs.svg)](https://david-dm.org/mboughaba/etcjs)

Simple node.js configuration module

## Installation via [npm](https://npmjs.org)

```shell
$ npm install etcjs --save
```

## Example
Even this is useless on its own, here is how to set up configuration for 'development' environment:

```shell
$ NODE_ENV=%ENV% npm start ../etc ../etc/default/default
# where %ENV% is the target environment.
```

### Using etcjs as a module in your node app
Once started up, the module will look for the default configuration file by requiring the 'defaultFile'.

After loading the default configuration, it will load the environment specific file from the 'dir' directory.

For example, if NODE_ENV=development then it will require 'root/dir/of/config/files/development.js'.

Finally, the callback function is called once all done.

```javascript
var etcjs = require('etcjs');
etcjs.load({dir: 'root/dir/of/config/files/', defaultFile: 'path/to/default/config/file'}, function () {
    console.info('configuration has been initialized');
});
```

if no configuration object is provided, etcjs will look for the default files
    inside the default location:
    * default global configuration file: ./etc/all.js
    * environment specific configuration file: ./etc/%env%.js, where env is the
    target environment.
    The callback can also be omitted in this case the module will do it job and
    returns.

```javascript
var etcjs = require('etcjs');
etcjs.load(function () {
    console.info('configuration has been initialized');
});
```
### methods
#### load
load the default and the local configuration and store it in the node
environment.
#### get([key])
returns the environment variable by key.
returns the node environment if no key is provided
#### set(key, value)
sets the environment variable of given key to value.

## Running tests

```shell
$ npm test
```

## People
Author: Mohamed Boughaba

### Looking for more?
Check out argument parser [minimist](https://github.com/substack/minimist)

or even [nconf](https://github.com/indexzero/nconf)

## License
[MIT](LICENSE)
