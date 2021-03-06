var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response, postData) {
  console.log("Request handler 'start' was called.");
 
 var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/css/bootstrap-combined.min.css" rel="stylesheet">'+
    '</head>'+
    '<body>'+
    '<h3>Rachel\'s rudimentary photo uploader</h3>' +
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" class="btn btn-warning offset1"/>'+
    '</form>'+
    '</body>'+
    '</html>';
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
 
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");

    if (error) {
      console.log("Error parsing form: " + error);
    }
    fs.rename(files.upload.path, "/tmp/test.png", function(err) {
      if (err) {
        fs.unlink("/tmp/test.png");
        fs.rename(files.upload.path, "/tmp/test.png");
        console.log("error:" + err );
      }
    });

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Got yo' photo (and made it fill the screen!) <br/>");
    response.write("<img src='/show' width='100%'/>");
    response.end();
  });
}

function show(response, postData) {
  console.log("Request handler 'show' was called");
  fs.readFile("/tmp/test.png", "binary", function(error, file){
    if (error){
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
