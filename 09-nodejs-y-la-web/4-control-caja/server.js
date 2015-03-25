// A partir de ahora empezaremos a usar NodeJs como servidor
// La mínima configuración para ello es la siguiente
(function () {
	"use strict";
	var http = require('http'),
		url = require('url'),
		path = require('path'),
		fs = require('fs');

	// Tipos básicos
	var mimeTypes = {
		"html": "text/html",
		"png": "image/png",
		"js": "text/javascript",
		"css": "text/css"
	};

	// Escuchar en el puerto 3000
	http.createServer(staticServer).listen(3000);

	function staticServer(req, res) {
		var pathname = url.parse(req.url).pathname;
		console.log(pathname);
		fileServer(res, pathname);
	}
	
	// Buscar el segmento de url en el disco
	function fileServer(res, pathname) {
		// obtener la ruta en disco a partir de la ruta web
		if(pathname==="/") pathname="index.html";
		var filename = path.join(process.cwd(),'client' ,pathname);
		var extension = path.extname(filename).split(".")[1];
		if (!extension) {
			extension = "html";
			filename += "." + extension;
		}
		
		fs.exists(filename, function (exists) {
			if (!exists) {
				notFound(res);
			} else {
				var mimeType = mimeTypes[extension];
				res.writeHead(200, {
					'Content-Type': mimeType
				});
				var fileStream = fs.createReadStream(filename);
				fileStream.pipe(res);
			}
		});
	}
	
	function notFound(res) {
		res.writeHead(404, {
			'Content-Type': 'text/html'
		});
		res.write("<html>");
		res.write("<head>");
		res.write("<meta charset='utf-8'>");
		res.write("<title>Control Caja</title>");
		res.write("</head>");
		res.write("<body>");
		res.write('<h1>404</h1> Nada por aquí');
		res.write("</body>");
		res.write("</html>");
		res.end();
	}

}());