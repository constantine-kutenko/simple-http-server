// router.js

function route(handle, pathname, response, postData, request) {
    console.log("About to route a request for " + pathname);

    if (typeof handle[pathname] === 'function') {
        if (pathname === '/file') {
            handle[pathname](response, request);
        } else {
            handle[pathname](response, postData);
        }
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found");
        response.end();
    }
}

exports.route = route;
