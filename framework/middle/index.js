var pathHandler = require('./path.js');
var staticHandler = require('./static.js');
var cookieHandler = require('./cookie.js');
var sessionHandler = require('./session.js');
var bodyParser = require('./bodyParser.js');

exports.path = pathHandler;
exports.static = staticHandler;
exports.cookie = cookieHandler;
exports.session = sessionHandler;
exports.body = bodyParser;
