// puedes recuperar argumentos desde la línea de comandos
(function() {
  "use strict";

  // array de argumentos process.argv[]
  var nodePath = process.argv[0]; // path donde está node.exe
  var scriptPath = process.argv[1]; // path donde está este script
  // Los Argumentos de usuario, se recuperan a partir de la 3ª posición
  var nombre = process.argv[2];
  var edad = process.argv[3];

  imprimir();

  function imprimir() {
    console.log("Ejecutando " + scriptPath + " con " + nodePath);
    console.log(nombre + " tiene " + edad + " años");
  }


}());
