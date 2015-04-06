use control_caja

function azar(desde, hasta) {
	return Math.floor((Math.random() * hasta) + desde)
}

function tipo() {
	if (azar(0, 10) > 4) {
		return 'Ingreso';
	} else {
		return 'Gasto';
	}
}

function user() {
	if (azar(0, 10) > 4) {
		return 'albertobasalo@agorabinaria.com';
	} else {
		return 'reinaldo.aguilera@gmail.com';
	}
}

for (i = 0; i < 100; i++) {
	var movimiento = {
		user: user();
		tipo: tipo(),
		importe: azar(100, 2500),
		fecha: new Date(2015, azar(0, 11), azar(1, 30), 12, 0, 0)
	};
	db.movimientos.insert(movimiento);
}

db.movimientos.find();