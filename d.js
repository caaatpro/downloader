const http = require('http'),
      https = require('https'),
      fs = require('fs-extra');

const uploadDir = 'uploads\\',
      fileList = 'files.txt';

var content = fs.readFileSync(fileList, 'utf8');

var files = content.split('\n');

files.forEach( function (url) {
  // console.log(url);
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
  }
})
