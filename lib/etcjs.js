/*global module:false,require:false*/
var debug = require('debug')('config'),
    path = require('path'),
    etcjs = (function() {

        var _getEnvironmentVariable = function(env) {
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
        };

        return {
            load: function(options, callback) {
                'use strict';
                var globalEnv,
                    localEnv,
                    env = _getEnvironmentVariable(process.env.NODE_ENV),
                    globalPath,
                    localPath;
                if (!options || !options.dir || !options.defaultFile) {
                    throw new Error('Missing required option `file`');
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
            }
        };
    })();

module.exports = etcjs;