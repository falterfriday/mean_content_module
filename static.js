var fs = require('fs');
module.exports = {
	request: function(request, response) {
		var index = './views/index.html'
		var error = './views/error.html'
		var resFun =  function(errors, contents){response.write(contents);response.end();}
		var string = request.url.substring(1)
		if(request.url === '/') {
			fs.readFile(index, 'utf8', resFun);
		}
		else if (request.url === '/favicon.ico') {
			response.writeHead(200, {'Content-Type': 'image/x-icon'} );
			response.end();
		}
		else if (string.length > 0) {
			fs.readFile('./views/'+string+'.html', 'utf8', function(errors, contents){
				if (!(errors)) {
					response.write(contents);
					response.end();
				}
				else if (errors) {
					fs.readFile('./images/'+string+'.jpg', function(errors, contents) {
						if (!(errors)) {
							response.write(contents);
							response.end();
						}
						else {
							fs.readFile(error, 'utf8', resFun)
						}
					})
				}
			})
		}
	}
}
