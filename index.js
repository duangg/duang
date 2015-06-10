var http = require('http');
var options = {
    port: 3000
};
var server = http.createServer(function(req, res){
    console.log("Receive request: " + req.method);
    res.end("Hello\n");
});


server.listen(options.port, function(){
    console.log("Listening " + options.port);
});
