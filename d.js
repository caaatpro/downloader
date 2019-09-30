const http = require('http');
const https = require('https');
const fs = require('fs-extra');

const uploadDir = 'uploads\\';
const fileList = 'files.txt';

var content = fs.readFileSync(fileList, 'utf8');

var files = content.split('\n');

const replaceDomain = (url) => {
  url = url.replace('http://tstvershina.dev.nikolas.ru/', 'https://ikino.ru/');
  
  return url;
}

files.forEach( function (url) {
  console.log(url);
  
  url = replaceDomain(url);

  //
  var array = url.split('/');
  var proto = array[0]
  var dir ='uploads/';
  var file = array[array.length-1];
  for (var i = 3; i < array.length-1; i++) {
    dir += array[i]+'/';
  }
  fs.ensureDirSync(dir);

  if (proto == 'http:') {
    var stream = fs.createWriteStream(dir + file);
    var request = http.get(url, function (response) {
      console.log(response.statusCode);
      response.pipe(stream);
    });
    
    return true;
  }
  }
})
