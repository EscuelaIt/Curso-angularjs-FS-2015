module.exports.routeMaestros = function (app) {
	app.get('/api/pub/maestros', function (req, res, next) {
		var maestros = {
			categoriasIngresos: ['Nómina', 'Ventas', 'Intereses Depósitos'],
			categoriasGastos: ['Hipotéca', 'Compras', 'Impuestos']
		};
		res.json(maestros);
	});
}