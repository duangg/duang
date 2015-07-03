var url = require('url');

var path = function(req, res, next) {
    var urlInfo = url.parse(req.url, true);
    req.path = urlInfo.pathname.split('?')[0] || '/';
    req.query = urlInfo.query;
    next();
   
};

// path.reg = function(path){
//     var keys = [];
//     path = path
//         .concat(strict ? '' : '/?')
//         .replace(/\/\(/g, '(?:/)')
//         .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, funciton(_, slash, format, key, capture, optional, star){
//         keys,push(Key);
//         slash = slash || '';
//         return ''
//             + (optional ? '' : slash)
//             + '(?:)
//             + (optional ? slash : '')
//             + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
//             + (optional || '')
//             +(star ? '(#<{(|)?' : '');
//         })
//         .replace(/([\/.])/g, '\\$1')
//         .replace(/\|)}>#g, '(.*)');
//     return {
//         keys: keys,
//         regexp: new RegExp('^' + path + '$)
//     };
// }

module.exports = path;
