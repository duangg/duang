var serializeCookie = function(name, val, opt){
    var pairs = [name + '=' +val];
    opt = opt || {};
    if (opt.maxAge) pairs.push('max-Age=' + opt.maxAge);
    if (opt.domain) pairs.push('domain=' + opt.domain);
    if (opt.path) pairs.push('path=' + opt.path);
    if (opt.expires) {
        var date = new Date();
        date.setTime(opt.expires);
        pairs.push('expires=' + date.toUTCString());
    }
    if (opt.httpOnly) pairs.push('httpOnly');
    if (opt.secure) pairs.push('secure');
    return pairs.join(';');
};

var parseCookie = function(cookie){
    var cookies = {}; 
    if (!cookie)
        return cookies;
    var list = cookie.split(';');
    for (var i = 0; i < list.length; i++){
        var pair = list[i].split('=');
        cookies[pair[0].trim()] = pair[1];
    }       
    return cookies
};

module.exports = function(req, res, next){
    req.cookies = parseCookie(req.headers.cookie);
    res.setCookie = function(key, val, opt){
        var cookie = serializeCookie(key, val, opt);
        var cookies = res.getHeader('Set-Cookie');
        if (Array.isArray(cookies))
            cookies = cookies.concat(cookie);
        else if (cookies)
            cookies = [cookies, cookie];
        else
            cookies = [cookie];
        res.setHeader('Set-Cookie', cookies);
    };
    next();
};
