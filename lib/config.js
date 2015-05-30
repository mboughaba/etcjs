/*global module:false,process:false,require:false*/
var debug = require('debug')('config'),
    path = require('path');

/**
 * validate and returns the NODE_ENV value.
 * @param   {String} env environment variable
 * @returns {String}   valid node environment variable
 */
function _getEnvironmentVariable(env) {
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

/**
 * Load node environment variables.
 * @param {Object} options should contain the `dir` property.
 * @param {Function} callback callback to be called when loading is done.
 */
module.exports = function(options, callback) {
    'use strict';
    var globalEnv,
        localEnv,
        env = _getEnvironmentVariable(process.env.NODE_ENV),
        globalPath,
        localPath;
    if (!options || !options.dir) {
        throw new Error('Missing required option `file`');
    }
    globalPath = path.normalize(options.dir + '/global/env');
    localPath = path.normalize(options.dir + '/' + env);
    debug('initializing configuration for %s', env);
    // NOTE: by loading the global env first we ensure that env. var. can be
    // overwritten by the local configuration.
    globalEnv = require(globalPath);
    env = localEnv = require(localPath);
    // NOTE: inform that loading the configuration is completed.
    callback();
};
