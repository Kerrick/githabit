var https = require('https');
var http = require('http');
var url = require('url');
var flag = require('node-env-flag');

// Send data to the HabitRPG Api
var habitRpg = function(options, callback) {
    var req = https.request({
        hostname: 'beta.habitrpg.com',
        method: 'post',
        path: '/api/v2/user/tasks/' +
            encodeURIComponent(options.taskName) +
            '/' +
            options.direction,
        headers: {
            'x-api-key': options.apiKey,
            'x-api-user': options.apiUser
        },
        
    }, callback);
    req.end();
    req.on('error', console.error.bind(console));
};

// Listen for GitHub webhooks
var method = flag(process.env.GITHABIT_SSL, false) ? https : http;
method.createServer(function(req, res) {
    var urlParts = url.parse(req.url, true);

    // Validation
    var agent = req.headers['user-agent'].toLowerCase();
    res.statusCode = 200;
    res.statusCode = req.method === 'POST' ? res.statusCode : 405;
    res.statusCode = /github/.test(agent) ? res.statusCode : 403;
    res.statusCode = urlParts.pathname === '/githabit' ? res.statusCode : 404;
    res.statusCode = urlParts.query.api ? res.statusCode : 401;
    res.statusCode = urlParts.query.user ? res.statusCode : 401;

    // Request Handling
    req.on('data', function(chunk) { /* no op */ });
    req.on('end', function() {
        var message = http.STATUS_CODES[res.statusCode];
        if (res.statusCode === 200) {
            habitRpg({
                taskName: 'GitHub',
                direction: 'up',
                apiKey: urlParts.query.api,
                apiUser: urlParts.query.user
            }, function() {
                res.end(message);
            });
        }
        else {
            res.end(message);
        }
    });
}).listen(process.env.GITHABIT_PORT || 4567);
