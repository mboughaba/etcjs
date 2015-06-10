var debug = require('debug')('config');

module.exports = {
    getEnvironmentVariable: function(env) {
        'use strict';

        var regEx = /^[a-zA-Z0-9_]*$/;

        if (!env) {
            debug('missing node environment variable');
            throw new Error('missing node environment');
        }

        if (!regEx.test(env)) {
            debug('invalid node environment variable');
            throw new Error('invalid node environment');
        }

        return env;
    }
};
