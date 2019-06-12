// index.js

var server = require("./server"),
    requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.index;
handle["/text"] = requestHandlers.text;
handle["/file"] = requestHandlers.file;
handle["/show"] = requestHandlers.show;
handle["/uploadtext"] = requestHandlers.uploadtext;
handle["/uploadfile"] = requestHandlers.uploadfile;

server.start("0.0.0.0", 8888, handle);
