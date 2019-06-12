// requestHandlers.js

var querystring = require("querystring"),
    formidable = require("formidable"),
    fs = require("fs");

function index(response) {
    /*
        Displayes the index page
    */

    // Debug
    console.log("Request handler 'upload' was called.");

    // File path is hardcoded for test purposes
    fs.readFile("images/image.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    })
}

function text(response) {
    /*
        A form for text upload
    */

    // Debug
    console.log("Request handler 'start' was called.");

    let html_body = '<!DOCTYPE html>'+
        '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '<title>start</title>'+
        '</head>'+
        '<body>'+
        '<form action="/uploadtext" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<br>'+
        '<input type="submit" value="Submit text" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(html_body);
    response.end();
}

function file(response) {
    /*
        A form for files upload
    */

    // Debug
    console.log("Request handler 'start' was called.");

    let html_body = '<!DOCTYPE html>'+
        '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '<title>start</title>'+
        '</head>'+
        '<body>'+
        '<form action="/uploadfile" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(html_body);
    response.end();
}

function uploadtext(response, postData) {
    /*
        A handler for text upload
    */

    // Debug
    console.log("Request handler 'upload' was called.");

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent: " +
        querystring.parse(postData).text);
    response.end();
}

function uploadfile(response, request) {
    /*
        A handler for file upload
    */

    // Debug
    console.log("Request handler 'uploadfile' was called.");

    let form = new formidable.IncomingForm();
    console.log("About to parse");
    form.parse(request, function(error, fields, files) {
        console.log("Parsing is done");

        fs.rename(files.upload.path, "temp/test.png", function(err) {
            if (err) {
                fs.unlink("temp/test.png");
                fs.rename(files.upload.path, "temp/test.png");
            }
        });

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("Received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });

}

function show(response) {
    /*
        Demonstrates the picture was uploaded
    */

    // Debug
    console.log("Request handler 'show' was called.");

    fs.readFile("temp/test.png", "binary", function(error, file) {
        if(error) {
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

exports.index = index;
exports.text = text;
exports.file = file;
exports.show = show;
exports.uploadtext = uploadtext;
exports.uploadfile = uploadfile;
