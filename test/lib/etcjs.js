/*global describe:false,it:false,process:false,require:false,__dirname:false*/
/*exported should*/
var etcjs,
    should = require('should'),
    env = process.env.NODE_ENV;

describe('node environment', function() {
    'use strict';

    it('should be running on \'' + env + '\' environment', function() {
        env.should.equal('testing');
    });
});

describe('etcjs', function() {
    'use strict';

    it('should be an instance of Object', function() {
        etcjs = require(__dirname + '/../../lib/etcjs');
        etcjs.should.be.an.instanceof(Object);
    });
});

describe('etcjs API', function() {
    'use strict';

    it('should have a \'load\' function', function() {
        etcjs = require(__dirname + '/../../lib/etcjs');
        etcjs.load.should.be.an.instanceof(Function);
    });

    it('should have a \'get\' function', function() {
        etcjs = require(__dirname + '/../../lib/etcjs');
        etcjs.get.should.be.an.instanceof(Function);
    });

    it('should have a \'set\' function', function() {
        etcjs = require(__dirname + '/../../lib/etcjs');
        etcjs.set.should.be.an.instanceof(Function);
    });

    it('should be able to load configuration from default location',
        function(done) {
            (function() {
                etcjs = require(__dirname + '/../../lib/etcjs');
                etcjs.load(function() {
                    done();
                });
            })
            .should.not.throw();
        });
    it('should be able to get environment variable by key', function(
        done) {
        (function() {
            etcjs = require(__dirname + '/../../lib/etcjs');
            etcjs.load({
                dir: '../etc/',
                defaultFile: '../etc/all.js'
            }, function() {
                etcjs.get('FOO')
                    .should.equal('bar');
                done();
            });
        })
        .should.not.throw();
    });

    it('should be able to get all environment variables if no key',
        function(done) {
            (function() {
                etcjs = require(__dirname + '/../../lib/etcjs');
                etcjs.load({
                    dir: '../etc/',
                    defaultFile: '../etc/all.js'
                }, function() {
                    etcjs.get()
                        .should.be.instanceof(Object);
                    done();
                });
            })
            .should.not.throw();
        });

    it('should be able to set environment variable value by key',
        function(done) {
            (function() {
                etcjs = require(__dirname + '/../../lib/etcjs');
                etcjs.load({
                    dir: '../etc/',
                    defaultFile: '../etc/all.js'
                }, function() {
                    etcjs.set('HELLO', 'WORLD');
                    etcjs.get('HELLO')
                        .should.equal('WORLD');
                    etcjs.set('HELLO', 'world!');
                    etcjs.get('HELLO')
                        .should.equal('world!');
                    done();
                });
            })
            .should.not.throw();
        });
});

describe('etcjs behavior', function() {
    'use strict';

    it('should not throw', function(done) {
        (function() {
            etcjs = require(__dirname + '/../../lib/etcjs');
            etcjs.load({
                dir: '../etc',
                defaultFile: '../etc/all.js'
            }, done);
        })
        .should.not.throw();
    });

    it('should not throw, even with trailing slash', function(done) {
        (function() {
            etcjs = require(__dirname + '/../../lib/etcjs');
            etcjs.load({
                dir: '../etc/',
                defaultFile: '../etc/all.js'
            }, done);
        })
        .should.not.throw();
    });

    it('should not throw, when callback is not provided', function(
        done) {
        (function() {
            etcjs = require(__dirname + '/../../lib/etcjs');
            etcjs.load({
                dir: '../etc/',
                defaultFile: '../etc/all.js'
            });
        })
        .should.not.throw();
        done();
    });

    it('should overwrite node environment', function(done) {
        (function() {
            etcjs = require(__dirname + '/../../lib/etcjs');
            etcjs.load({
                dir: '../etc/',
                defaultFile: '../etc/all.js'
            }, function() {
                var env = process.env;

                env.TO_BE_OVERWRITTEN.should.equal(
                    'overwritten value');
                done();
            });
        })
        .should.not.throw();
    });

    it('should load node environment from default', function(done) {
        (function() {
            etcjs = require(__dirname + '/../../lib/etcjs');
            etcjs.load({
                dir: '../etc/',
                defaultFile: '../etc/all.js'
            }, function() {
                var env = process.env;

                env.FOO_BAR.should.equal('baz qux');
                done();
            });
        })
        .should.not.throw();
    });

    it('should load node environment from environment specific file',
        function(done) {
            (function() {
                etcjs = require(__dirname + '/../../lib/etcjs');
                etcjs.load({
                    dir: '../etc/',
                    defaultFile: '../etc/all.js'
                }, function() {
                    var env = process.env;

                    env.FOO.should.equal('bar');
                    done();
                });
            })
            .should.not.throw();
        });

    it('should throw when required options are missing', function() {
        (function() {
            etcjs = require(__dirname + '/../../lib/etcjs');
            etcjs.load({});
        })
        .should.throw();
    });

    it('should throw when required option dir is missing', function() {
        (function() {
            etcjs = require(__dirname + '/../../lib/etcjs');
            etcjs.load({
                defaultFile: '../etc/all.js'
            });
        })
        .should.throw();
    });

    it('should throw when required option defaultFile is missing',
        function() {
            (function() {
                etcjs = require(__dirname + '/../../lib/etcjs');
                etcjs.load({
                    dir: '../etc/'
                });
            })
            .should.throw();
        });

    it('should throw when environment is missing', function() {
        (function() {
            process.env.NODE_ENV = '';
            etcjs = require(__dirname + '/../../lib/etcjs');
            etcjs.load();
        })
        .should.throw();
    });

    it('should throw when environment is invalid', function() {
        (function() {
            process.env.NODE_ENV =
                './node_module/bin/mocha';
            etcjs = require(__dirname + '/../../lib/etcjs');
            etcjs.load();
        })
        .should.throw();
    });
});
