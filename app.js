var url = require('url');
var queryString = require('querystring');
var path = require('path');
var fs = require('fs');

var ROOT = __dirname;

var basicHandler = function(req, res){
    console.log("Receive request: " + req.method);
    console.log(req.url);
    res.end("Hello\n");
};

var pathHandler = function(req, res){
    var pathname = url.parse(req.url).pathname;
    fs.readFile(path.join(ROOT, pathname), function(err, file){
        if (err){
            res.writeHead(404);
            res.end("找不到文件。——");
        }
        res.writeHead(200);
        res.end(file);
    });
};

// controller & action handler
var caHandler = function(req, res){
    console.log("query", req.query);
    var pathname = url.parse(req.url).pathname;
    var paths = pathname.split('/');
    var controller = paths[1] || 'index';
    var action = paths[2] || 'index';
    var args = paths.slice(3);
    if (handles[controller] && handles[controller][action]){
        handles[controller][action].apply(null, [req, res].concat(args));
    } else {
        res.writeHead(404);
        res.end("Page not found\n");
    }
};
var handles = {};
handles.index = {};
handles.index.index = function(req, res){
    res.writeHead(200);
    res.end("Hello,world!\n");
};


// query handler
var queryHandler = function(req, res){
    var query = url.parse(req.url, true).query;
    req.query = query;
    caHandler(req, res);
};
module.exports = basicHandler;
