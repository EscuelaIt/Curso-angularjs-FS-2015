var host = 'http://localhost:3000/#/';
describe('ingreso |', function () {
    it('should save an ingreso', function () {
        browser.get(host);
        var menuNuevo = element(by.name('menu-nuevo'));
        // Navegación a otra página
        menuNuevo.click()
            .then(function () {
                // función asíncrona
                var importe = element(by.name('importe'));
                importe.clear();
                importe.sendKeys('2000');
                element(by.name('guardar')).click();
                // comprobar en totales
                var menutotal = element(by.name('menu-total'));
                menutotal.click()
                    .then(function () {
                        var ingresos = element(by.name('ingresos'));
                        // comprobamos el texto, incluído el formato...
                        expect(ingresos.getText()).toEqual('2,000.00 €');
                    });
            });
    });
});