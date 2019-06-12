// server.js

var http = require("http"),
    url = require("url"),
    router = require("./router");

function start(address, port, handle) {
    http.createServer(function(request, response) {
        let postData = "";

        // Get a path
        let pathname = url.parse(request.url).pathname;
        
        // Does not bother about icon so far
        if (pathname !== '/favicon.ico') {
            console.log("Request for " + pathname + " received.");
            if (pathname === '/file') {
                router.route(handle, pathname, response, postData, request);
            } else {
                request.setEncoding("utf-8");

                request.addListener("data", function (postDataChunk) {
                    postData += postDataChunk;
                    // TODO comment out logging in production since overhead
                    console.log("Received POST data chunk '" +
                        postDataChunk + "'.");
                });

                request.addListener("end", function () {
                    router.route(handle, pathname, response, postData);
                });
            }
        }
    }).listen(port, address);

    console.log("Server has started on %s:%s", address, port);
}

exports.start = start;
