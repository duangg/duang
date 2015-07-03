var sessions = {};
var sessionKey = 'session_id';
var EXPIRES = 1200000;
var sessionGenerator = function(){
    var session = {};
    session.id = Date.now() + Math.random();
    session.cookie = {
        expires: Date.now() + EXPIRES

    };
    sessions[session.id] = session;
    return session;

};


module.exports = function(req, res, next){
    var sessionId = req.cookies[sessionKey];
    if (sessionId){
        var session = sessions[sessionId];
        if (session){
            if (Date.now() > session.expires){
                delete sessions[sessionId];
                req.session = sessionGenerator();
            } else {
                session.cookie.expires = Date.now() + EXPIRES;
                req.session = session;
            }
        } else {
            req.session = sessionGenerator()
        }
    } else {
        req.session = sessionGenerator();
    }

    // hack writeHead
    var writeHead = res.writeHead;
    res.writeHead = function(){
        res.setCookie(sessionKey, req.session.id, req.session.cookie);
        return writeHead.apply(this, arguments);
    };

    next();
};
