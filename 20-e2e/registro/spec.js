var host = 'http://localhost:3000/#/';
describe('registro |', function () {
	it('should perform a registro', function () {
		browser.get(host);
		var email = element(by.name('email'));
		email.clear();
		email.sendKeys('albertobasalo@agorabinaria.com');
		var password = element(by.name('password'));
		password.clear();
		password.sendKeys('1234');
		var registrar = element(by.name('registrar'));
		registrar.click()
			.then(function () {
				var ingresos = element(by.name('ingresos'));
				// comprobamos el texto, incluído el formato...
				expect(ingresos.getText()).toEqual('0.00 €');
			});
	});
	
	
	it('should not allow to re-registro', function () {
		browser.get(host+"#/registro");
		var email = element(by.name('email'));
		email.clear();
		email.sendKeys('albertobasalo@agorabinaria.com');
		var password = element(by.name('password'));
		password.clear();
		password.sendKeys('1234');
		var registrar = element(by.name('registrar'));
		registrar.click()
			.then(function () {
				var email = element(by.name('email'));
				expect(email.isPresent()).toBe(true);
			});
	});
});