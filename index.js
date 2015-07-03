var http = require('http');
var middle = require('./framework/middle/index.js');
var app = require('./app.js');
var cfg = require('./config.json');

app.use(middle.path);
app.use(middle.cookie);
app.use(middle.session);
app.use(middle.body);
app.use('/public', middle.static);
app.get('/', function(req, res){
    res.end("Hello, New bee");
})

var server = http.createServer(app);
server.listen(cfg.port, function(){
    console.log("Listening " + cfg.port);
});
