/*global process:false*/
var env = process.env;

env.FOO = 'bar';
env.DEBUG = '*';
env.TO_BE_OVERWRITTEN = 'overwritten value';
