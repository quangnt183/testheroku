var express = require('express');

var app = express.createServer(express.logger());

app.configure(function () {
  app.use('/public', express.static(__dirname + '/public'));
});

app.get('/ball.js', function(request, response) {
	response.sendfile(__dirname + '/ball.js');
});
app.get('/*', function(request, response) {
	console.log("EEE", request.url);
	
	response.sendfile(__dirname + '/index.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});