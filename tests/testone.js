'use strict'

var assert = require('assert');
var dupes = require('../dupes');

describe('dupes', function () {

  it('should exist', function () {
    assert (dupes);
  });
});

describe('getFile', function () {

  it('should return an object with size 20', function (done) {
    dupes.getFile('./tests/testone/test1.txt').then(function(result){
      assert (typeof result === 'object');
      assert (result.size === 20);
      done();  
    },function(result){
      done(result);
    });
  });

});

describe('getFileAndHash', function () {

  it('getFileAndHash should return a file stats and hash', function (done) {
    dupes.getFileAndHash('./tests/testone/test1.txt').then(function(result){
      assert(result);
      assert(result.hash);
      assert(result.stat);
      done();  
    },function(result){
      done(result);
    });
  });

});

describe('getDir', function () {

  it('should return an array', function (done) {
    dupes.getDir('./tests/testone/dir_a').then(function(result){
      assert(result);
      assert(Array.isArray(result));
      done();  
    },function(result){
      done(result);
    });
  });

});

describe('catalogDir', function () {

  it('should ', function (done) {
    dupes.catalogDir('./tests/testone').then(function(result){
      done();  
    },function(result){
      done(result);
    });
  });

});