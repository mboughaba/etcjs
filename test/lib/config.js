/*global describe:false,it:false,process:false,require:false,__dirname:false*/
/*exported should*/
var config,
    should = require('should'),
    env = process.env.NODE_ENV;
describe('testing', function() {
    'use strict';
    it('should be running on \'' + env + '\' environment', function() {
        env.should.equal('testing');
    });
});
describe('config', function() {
    'use strict';
    it('should not throw', function(done) {
        (function() {
            config = require(__dirname +
                '/../../lib/config');
            config(done);
        })
        .should.not.throw();
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