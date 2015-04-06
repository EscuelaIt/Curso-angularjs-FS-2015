use control_caja

// busquedas
var movimientos_alberto = db.movimientos.find({
	user: 'albertobasalo@agorabinaria.com'
});

var nomina_alberto = db.movimientos.find({
	user: 'albertobasalo@agorabinaria.com',
	categoria: 'Nómina'
});

var grandes_movimientos = db.movimientos.find({
	importe: {
		$gt: 1000
	}
});

var alberto_or_grandes_movimientos = db.movimientos.find({
	$or: [{
			importe: {
				$gt: 1000
			}
		}, {
			user: 'albertobasalo@agorabinaria.com'
		}
	]
});

var movimientos_parecidos = db.movimientos.find({
	user: /agorabinaria/
});

var movimientos_parecidos = db.movimientos.find({
	user: /al/i
});

var movimientos_parecidos = db.movimientos.find({
	user: /^al/
});


var movimientos_ordenados = db.movimientos.find().sort({importe:1});

// proyecciones
var movimientos_importes = db.movimientos.find({},{importe:1})
var movimientos_importes_sin_clave = db.movimientos.find({},{importe:1, _id:0})

// limites y paginación
db.movimientos.find().limit(2).skip(1)
// cuenta
db.movimientos.count()
// distintos
db.movimientos.distinct( "categoria" )