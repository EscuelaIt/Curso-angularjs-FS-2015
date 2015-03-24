(function() {
  "use strict";
  // array de argumentos process.argv[]
  var nodePath = process.argv[0];
  var scriptPath = process.argv[1];
  // Argumentos de usuario
  var nombre = process.argv[2];
  var edad = process.argv[3];

  imprimir();

  function imprimir() {
    console.log("Ejecutando " + scriptPath + " con " + nodePath);
    console.log(nombre + " tiene " + edad + " años");
  }


}());
