var url = require('url'),
    _   = require('lodash');

// Validate webhook and return an appropriate HTTP status code
module.exports = function(req) {

    function parts(req) { return url.parse(req.url, true); };
    function validate(validation) { return validation(req); };

    var validations = [
        function(req) { return parts(req).pathname === '/githabit' ? null : 404; },
        function(req) { return !!parts(req).query.user ? null : 401; },
        function(req) { return !!parts(req).query.api ? null : 401; },
        function(req) { return req.method === 'POST' ? null : 405; },
        function(req) { return /github/.test(req.headers['user-agent'].toLowerCase()) ? null : 403; },
    ];

    return _.first(_.compact(validations.map(validate))) || 200;
    
};
