var url = require('url');
var queryString = require('querystring');
var path = require('path');
var fs = require('fs');

var ROOT = __dirname;

var routes = {
    'all': []
};

var getRouter = function(method){
    var m = method || 'all';
    return function(path){
        if (typeof path == 'string'){
            var handle = {
                path: path,
                stack: Array.prototype.slice.call(arguments, 1)
            };
        } else {
            var handle = {
                path: '/',
                stack: Array.prototype.slice.call(arguments, 0)
            };
        }
        if (handle.stack.length > 0){
            routes[m].push(handle);
        }
    };
};

var paramsObj = {};
var match = function(path, routes){
    var stack = [];
    routes.forEach(function(route){
        var params = [];
        var pattern = route.path.replace(/\//g, '\\/')
            .replace(/\:(\w+)/g, function(origin, param, index, full){
                params.push(param);
                return '(\\w+)';
            }); 
        var regexp = new RegExp(pattern);
        var result = regexp.exec(path);

        if (result){
            if (params.length > 0){
                params.forEach(function(param, index){
                    paramsObj[param] = result[index + 1];
                });
            }
            stack = stack.concat(route.stack);
        }
    });
    return stack;
};

// handler
var app = function(req, res){
    req.ROOT = __dirname;
    var pathname = url.parse(req.url).pathname;
    var path = pathname.split('?')[0] || '/';
    var stack = match(path, routes['all']);
    var mStack = match(path, routes[req.method.toLowerCase()]);
    stack = stack.concat(mStack);
    req.params = paramsObj;

    var next = function(){
        var middleWare = stack.shift();
        if (middleWare){
            middleWare(req, res, next);
        } 
    };

    if (stack.length > 0)
        next();
    else{
        res.writeHead(404);
        res.end("File not found");
    }
};

['get', 'post', 'put', 'delete'].forEach(function(method){
    routes[method] = [];
    app[method] = getRouter(method);
});

app.use = getRouter();
module.exports = app;
