/*global describe:false,it:false,process:false,require:false,__dirname:false*/
/*exported should*/
var config,
    should = require('should'),
    env = process.env.NODE_ENV;
describe('node environment', function() {
    'use strict';
    it('should be running on \'' + env + '\' environment', function() {
        env.should.equal('testing');
    });
});
describe('configuration', function() {
    'use strict';
    it('should not throw', function(done) {
        (function() {
            config = require(__dirname + '/../../lib/config');
            config({
                dir: '../etc',
                defaultFile: '../etc/default/default.js'
            }, done);
        })
        .should.not.throw();
    });
    it('should not throw, even with trailing slash', function(done) {
        (function() {
            config = require(__dirname + '/../../lib/config');
            config({
                dir: '../etc/',
                defaultFile: '../etc/default/default.js'
            }, done);
        })
        .should.not.throw();
    });
    it('should throw when required options are missing', function() {
        (function() {
            config = require(__dirname + '/../../lib/config');
            config({});
        })
        .should.throw();
    });
    it('should throw when required option dir is missing', function() {
        (function() {
            config = require(__dirname + '/../../lib/config');
            config({
                defaultFile: '../etc/default/default.js'
            });
        })
        .should.throw();
    });
    it('should throw when required option defaultFile is missing', function() {
        (function() {
            config = require(__dirname + '/../../lib/config');
            config({
                dir: '../etc/'
            });
        })
        .should.throw();
    });
    it('should throw when options is missing', function() {
        (function() {
            config = require(__dirname + '/../../lib/config');
            config();
        })
        .should.throw();
    });
    it('should throw when environment is invalid', function() {
        (function() {
            process.env.NODE_ENV = './node_module/bin/mocha';
            config = require(__dirname +
                '/../../lib/config');
            config();
        })
        .should.throw();
    });
    it('should throw when environment is missing', function() {
        (function() {
            process.env.NODE_ENV = '';
            config = require(__dirname +
                '/../../lib/config');
            config();
        })
        .should.throw();
    });
});
