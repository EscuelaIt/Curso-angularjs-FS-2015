(function () {
	"use strict";
	var http = require('http');

	http.createServer(server).listen(3000);

	function server(req, res) {
		// Repondemos enviando html...
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		res.write("<html>");
		res.write("<head>");
		res.write("<title>Hola Mundo</title>");
		res.write("</head>");
		res.write("<body>");
		res.write("<h1>Hola</h1><p>enviado por NodeJS al navegador<p> ;-)");
		res.write("</body>");
		res.write("</html>");
		// esto es un web server
		res.end();
	}

}());