/*global module:false,require:false*/
var debug = require('debug')('config'),
    path = require('path'),
    processEnv = process.env,
    helper = require(__dirname + '/util/helper'),
    etcjs = (function() {
        'use strict';
        return {
            load: function(options, callback) {
                var globalEnv,
                    localEnv,
                    env = helper.getEnvironmentVariable(processEnv.NODE_ENV),
                    globalPath,
                    localPath;

                // NOTE: assign callback if it is the only provided argument.
                if (!callback) {
                    callback = options;
                }
                // NOTE: default setup.
                if (!options || typeof options !== 'object') {
                    options = {
                        dir: '../etc/',
                        defaultFile: '../etc/all.js'
                    };
                }
                globalPath = path.normalize(options.defaultFile);
                localPath = path.normalize(options.dir + '/' + env);
                debug('initializing configuration for %s', env);
                // NOTE: by loading the global env first we ensure that env. var. can be
                // overwritten by the local configuration.
                globalEnv = require(globalPath);
                env = localEnv = require(localPath);
                // NOTE: inform that loading the configuration is completed.
                if (callback && typeof callback === 'function') {
                    callback();
                }
            },
            get: function(key) {
                if (!key) {
                    return processEnv;
                }
                return processEnv[key];
            },
            set: function(key, value) {
                processEnv[key] = value;
            }
        };
    })();

module.exports = etcjs;
