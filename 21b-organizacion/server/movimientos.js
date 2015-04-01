var maxId = 0;
var movimientos = [];
var totales = [];

module.exports.routeMovimientos = function (app) {


	app.route('/api/priv/movimientos')
		.get(function (req, res, next) {
			var movimientosUsuario = movimientos.filter(function (m) {
				return m.usuario = req.usuario;
			});
			res.json(movimientosUsuario);
		})
		.post(function (req, res, next) {
			var movimiento = req.body;
			movimiento.usuario = req.usuario;
			maxId++;
			movimiento.id = maxId;
			movimientos.push(movimiento);
			var totalUsuario = getTotalUsuario(req.usuario);
			if (movimiento.tipo == 'Ingreso')
				totalUsuario.ingresos += movimiento.importe;
			else
				totalUsuario.gastos += movimiento.importe;
			res.status(200).send();
		});

	app.get('/api/priv/movimientos/:id', function (req, res, next) {
		var movId = req.params.id;
		movimientoBuscado = getMovimientoById(movId, req.usuario);
		res.json(movimientoBuscado);
	});

	function getMovimientoById(id, usuario) {
		var movimientoBuscado = movimientos.filter(function (movimiento) {
			return movimiento.id == id && movimiento.usuario == usuario;
		})[0];
		return movimientoBuscado;
	}

	app.get('/api/priv/total', function (req, res, next) {
		var totalUsuario = getTotalUsuario(req.usuario);
		res.json(totalUsuario);
	});

	function getTotalUsuario(usuario) {
		if (usuario === undefined) return {};
		var totalUsuario = totales.filter(function (t) {
			return t.usuario == usuario;
		})[0];
		if (totalUsuario === undefined) {
			totalUsuario = {
				usuario: usuario,
				ingresos: 0,
				gastos: 0
			};
			totales.push(totalUsuario);
		}
		return totalUsuario;
	}

}