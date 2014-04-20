var url = require('url');

// Validate webhook and return an appropriate HTTP status code
module.exports = function(req) {
    var urlParts = url.parse(req.url, true);
    var agent = req.headers['user-agent'].toLowerCase();

    if (urlParts.pathname !== '/githabit') return 404;
    if (!urlParts.query.user) return 401;
    if (!urlParts.query.api) return 401;
    if (req.method !== 'POST') return 405;
    if (!/github/.test(agent)) return 403;

    return 200;
};
