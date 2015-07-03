var queryString = require('querystring');

var hasBody = function(req){
    return 'transfer-encoding' in req.headers || 'content-type' in req.headers;
}

var parseUrl = function(req){
    req.body = queryString.parse(req.rawBody);
};

var parseBody = function(req){
    switch (req.headers['content-type']){
        case 'application/x-www-form-urlencoded':
            parseUrl(req);
            break;
    };
};

module.exports = function(req, res, next){
    if (hasBody(req)){
        req.setEncoding('utf8');
        var postData = '';
        req.on('data', function(chunk){
            postData += chunk;
        });

        req.on('end', function(){
            req.rawBody = postData;
            parseBody(req);
        });
    }
    next();
};
