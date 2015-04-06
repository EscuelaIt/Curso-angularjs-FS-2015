use control_caja

var subir_nomina_alberto = db.movimientos.update({
	user: 'albertobasalo@agorabinaria.com',
	categoria: 'Nómina'
}, {
	$inc: {
		importe: 328
	}
});


var cambiar_hipoteca_alberto = db.movimientos.update({
	user: 'albertobasalo@agorabinaria.com',
	categoria: 'Hipoteca'
}, {
	$set: {
		categoria: 'Alquiler'
	}
});

var subir_gastos_abril = db.movimientos.update({
	tipo: 'Gasto',
	fecha: {
		$gte: new Date(2015, 03, 01, 12, 00, 00),
		$lt: new Date(2015, 04, 01, 12, 00, 00)
	}
}, {
	$inc: {
		importe: 11
	}
}, {
	multi: true
});

// Cambiar un documento por otro
var nomina_alberto = db.movimientos.update({
	user: 'albertobasalo@agorabinaria.com',
	categoria: 'Nómina'
},{
	user: 'albertobasalo@agorabinaria.com',
	tipo: 'Ingreso',
	categoria: 'Nómina',
	importe: 1800,
	fecha: new Date(2015, 03, 01, 12,00, 00, 000)
}); 
// Peligro!!!!
var nomina_alberto = db.movimientos.update({
	user: 'albertobasalo@agorabinaria.com',
	categoria: 'Nómina'
},{
	importe: 1800
}); 


// recuperación
var nomina_alberto = {
	user: 'albertobasalo@agorabinaria.com',
	tipo: 'Ingreso',
	categoria: 'Nómina',
	importe: 1800,
	fecha: new Date(2015, 03, 01, 12,00, 00, 000)
};
db.movimientos.findAndModify(
	{query:{_id: ObjectId("5522ac18dc9308d02d124fe5")},update:nomina_alberto});



// borrado
db.movimientos.remove({user: 'albertobasalo@agorabinaria.com'});
db.movimientos.remove({});