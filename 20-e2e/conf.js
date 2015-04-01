var HtmlReporter = require('protractor-html-screenshot-reporter');

// configuración de reporter para generar screenshots e informes
var reporter = new HtmlReporter({
    baseDirectory: './screenshots',
    //    takeScreenShotsOnlyForFailedSpecs: true,
    docName: 'protractor-report.html'
});

// configuración básica del protractor
exports.config = {
    // ruta del web driver
    seleniumAddress: 'http://localhost:4444/wd/hub',
    
	
	// Array de pruebas secuenciales
    specs: ['./index/spec.js','./registro/spec.js','./ingreso/spec.js'],
    
	
	
	// Agregar el reporte html
    onPrepare: function () {
        jasmine.getEnv().addReporter(reporter);
    }

}