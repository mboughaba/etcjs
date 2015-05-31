# etcjs
[![Build Status](https://travis-ci.org/mboughaba/etcjs.svg?branch=master)](https://travis-ci.org/mboughaba/etcjs)[![Coverage Status](https://coveralls.io/repos/mboughaba/etcjs/badge.svg)](https://coveralls.io/r/mboughaba/etcjs)[![Dependency Status](https://david-dm.org/mboughaba/etcjs.svg)](https://david-dm.org/mboughaba/etcjs)

Simple stupid node.js configuration module

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
etcjs requires few options. Once started up, the module will look for the default configuration file by requiring the 'defaultFile'.

After loading the default configuration, it will load the environment specific file from the 'dir' directory.

For example, if NODE_ENV=development then it will require 'root/dir/of/config/files/development.js'.

Finally, the callback function is called once all done.

```javascript
var etcjs = require('etcjs');
etcjs.load({dir: 'root/dir/of/config/files/', defaultFile: 'path/to/default/config/file'}, function () {
    console.info('configuration has been initialized');
});
```

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
