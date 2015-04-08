var movimientosData = require('./data/movimientosData.js');
var usuariosData = require('./data/usuariosData.js');

module.exports.routeMovimientos = function (app) {

	app.route('/api/priv/movimientos')
		.get(function (req, res, next) {
			movimientosData.findingByUsuario(req.usuario)
				.then(function (data) {
					res.json(data);
				})
				.fail(function (err) {
					res.status(500).send(err);
				});
		})
		.post(function (req, res, next) {
			var movimiento = req.body;
			movimiento.usuario = req.usuario;
			movimientosData.inserting(movimiento)
				.then(function (data) {
					usuariosData.findingByEmail(req.usuario)
						.then(function (data) {
							var usuario = data[0];
							if (usuario.total === undefined) {
								usuario.total = {
									ingresos: 0,
									gastos: 0
								};
							}
							if (movimiento.tipo == 'Ingreso') {
								usuario.total.ingresos += movimiento.importe;
							} else {
								usuario.total.gastos += movimiento.importe;
							}
							usuariosData.updating(usuario)
								.then(function (data) {
									res.json(data);
								})
								.fail(function (err) {
									res.status(500).send(err);
								});
						})
						.fail(function (err) {
							res.status(500).send(err);
						});
				})
				.fail(function (err) {
					res.status(500).send(err);
				});
		});

	app.get('/api/priv/movimientos/:id', function (req, res, next) {
		movimientosData.findingByIdUsuario(req.params.id, req.usuario)
			.then(function (data) {
				res.json(data[0]);
			})
			.fail(function (err) {
				res.status(500).send(err);
			});
	});

	app.get('/api/priv/total', function (req, res, next) {
		usuariosData.findingByEmail(req.usuario)
			.then(function (data) {
				res.json(data[0].total);
			})
			.fail(function (err) {
				res.status(500).send(err);
			});
	});
}