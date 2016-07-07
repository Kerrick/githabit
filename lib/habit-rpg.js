var https = require('https');

var apiCreateTaskPath = '/api/v3/tasks/user';
var apiScorePath = '/api/v3/tasks/name/score/dir';

// Send data to the HabitRPG Simple API v3
module.exports = function(options, callback) {
	var apiOptions = new ApiOptions(options);
	var apiParameters = getApiCreateTaskParameters(apiOptions);

	// Send a request to create the githabit task, if it does not already exists
	var req = https.request(apiParameters, function(res) {
		res.on('data', function(data) {
			requestScoreTask(apiOptions, callback);
		});
	});
	req.on('error', console.error.bind(console));
	req.write(JSON.stringify(new TaskApiBasicBody(apiOptions)));
	req.end();
};

// Send a request to score the githabit task, according to the options passed
function requestScoreTask(apiOptions, callback) {
	var apiParameters = getApiScoreParameters(apiOptions);
	var req = https.request(apiParameters, callback);
	req.on('error', console.error.bind(console));
	req.end();
}

// Creates the create task rest api parameters.
function getApiCreateTaskParameters(apiOptions) {
	return getApiParameters(apiOptions, apiCreateTaskPath);
}

// Creates the score task rest api parameters.
function getApiScoreParameters(apiOptions) {
	var parsedApiScorePath = apiScorePath.replace("name", 
		apiOptions.name).replace("dir", apiOptions.dir);
	return getApiParameters(apiOptions, parsedApiScorePath);
}

// Creates the api parameters, according to the parameters passed.
function getApiParameters(apiOptions, apiPath) {
	return {
		hostname: 'habitica.com',
		method: 'POST',
		path: apiPath,
		headers: {
			'content-type': 'application/json',
			'x-api-key': apiOptions.api, 'x-api-user': apiOptions.user
		}
	};
}

// Options for the create and score task rest api.
var ApiOptions = function(options) {
	this.name = encodeURIComponent(options.taskName || 'GitHub');
	this.alias = encodeURIComponent(options.taskAlias || 'GitHub');
	this.dir = encodeURIComponent(options.direction || 'up');
	this.type = encodeURIComponent(options.taskType || 'habit');
	this.api = options.api;
	this.user = options.user;
}

// Basic body for the create task rest api.
var TaskApiBasicBody = function(apiOptions) {
	this.type = 'habit';
	this.text = apiOptions.name;
	this.alias = apiOptions.name;
}
