var http = require('http');
var app = require('./app.js');

var options = {
    port: 3000
};
var server = http.createServer(app);
server.listen(options.port, function(){
    console.log("Listening " + options.port);
});
