/*global module:false,process:false,require:false,__dirname:false*/
var debug = require('debug')('config');

/**
 * validate and returns the NODE_ENV value.
 * @param   {String} env environment variable
 * @returns {String}   valid node environment variable
 */
function _getEnvironmentVariable(env) {
    var regEx = /^[a-zA-Z0-9_]*$/;

    if (!env) {
        debug('missing node environment variable');
        throw new Error('missing node environment, check README');
    }

    if (!regEx.test(env)) {
        debug('invalid node environment variable');
        throw new Error('invalid node environment, check README');
    }
    return env;
}

/**
 * Load node environment variables.
 * @param {Function} callback callback to be called when loading is done.
 */
module.exports = function(callback) {
    'use strict';
    var globalEnv,
        localEnv,
        env = _getEnvironmentVariable(process.env.NODE_ENV);

    debug('initializing configuration for %s', env);
    // NOTE: by loading the global env first we ensure that env. var. can be
    // overwritten by the local configuration.
    globalEnv = require(__dirname + '/../etc/global/env');
    env =
        localEnv = require(__dirname + '/../etc/' + env);
    // NOTE: inform that loading the configuration is completed.
    callback();
};