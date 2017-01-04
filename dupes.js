'use strict'
var fs = require('fs');
var md5 = require('md5-file');
var file = require('file');

module.exports = {

  getFile : function(filepath) {
    
    return new Promise((resolve, reject) => {
      fs.stat(filepath, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    
  },

  getFileAndHash : function(filepath) {
    
    return new Promise((resolve, reject) => {
      fs.stat(filepath, (err, data) => {
        if(err){ 
          reject(err);
        }
        
        md5(filepath, (err, hash) => {
          if (err){
           reject(err);
          }
          data.path = filepath;
          resolve({stat: data, hash: hash});
        });
      });
    });    
  },

  getDir : function (filepath) {

    return new Promise((resolve,reject) => {

      fs.readdir(filepath, (err, files) => {
        if (err){
          reject(err);
        }
        resolve(files);
      })
    });
  },

  catalogDir : function (catalog, filepath) {
    file.walk(filepath, (start, dir, dirs, names) => {
      var promises = [];

      for(let name of names){
        promises.push(module.exports.getFileAndHash(name));
      }

      Promise.all(promises).then(values => {
        console.log(values);
        for(let result of values){
          //console.log(result)
          if(catalog[result.hash]){
            console.log("Duplicate found!  ", catalog[result.hash].stat);
          }
          else{
            catalog[result.hash] = stat;
          }
        }

        
      })

    });
  }
  
};  
  
module.exports.catalogDir({},'/Users/ascavone/sites/github/dupes/tests/testone')
