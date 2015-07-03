var fs = require('fs');
var path = require('path');
var ROOT = __dirname + '/..';

module.exports = function(req, res, next){
    var filePath = path.resolve(req.ROOT + req.path);
    fs.exists(filePath, function(exists){
        if (exists){
            var rs = fs.createReadStream(filePath, {encoding: 'utf8'});
            res.writeHead(200);
            rs.pipe(res);
        } else {
            res.writeHead(404);
            res.end('File not found');
        }
    });
};
