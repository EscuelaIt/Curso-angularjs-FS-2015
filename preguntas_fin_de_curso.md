# Preguntas fin de curso AngularJS FullStack

1) una función siempre devuelve una variable con el objeto que la contiene o algo asi... function(e){} 
La cuestión es que no acabo de entenderlo ¿Sabes donde podria encontrar más info sobre esto? ¿o como buscar?

>Supongo que te refieres a una función **callback**. En ese caso te diré que son funciones que serán llamadas en un futuro y que suelen tener el siguiente patrón:

```javascript

function(err, result){
    if(err){
        console.error(err);
    } else {
        // hcer algo con result
    }
    
}
```

2) En el curso, estamos desarrollando una mini aplicación donde tenemos 3 vistas relativamente pequeñas: 
- Vista para el resumen de total de ingresos, gastos y balance 
- Vista con el formulario para introducir ingresos y gastos 
- Vista con el listado de los ingresos y gastos introducidos
El caso es que, los Controllers que gestionan estas vistas, tienen muy poco código y quedan relativamente elegantes. 
¿Qué pasa para cuando tenemos una pantalla más compleja? Es decir, un formulario con muchos campos donde se tienen que cargar listas en combos, pintar checks, etc. 
¿Cómo separar ese control de vistas para que no quede un Controller monstruoso?

>Partimos de una situación con una Vista y un Controlador. Cuando ambos crecen deben *repartir* la responsabilidad hacia otros elementos. Los controladores delgarán en servicios y factorías, mientras que las vistas lo harán en directivas.

 3) Al crear factories que devuelven constructores (clases) instanciables, el cual necesito realizar un new de la inyección de dependencia en un Controller por ejemplo (no interesa que sea un singleton, 
ya que tendremos varias instancias del servicio en el mismo Controller). ¿La nomenclatura sigue siendo la misma? o por el contrario estos servicios que contienen "clases" tendrán la notación 
"PascalCase" (MyClassFactory vs myClassFactory).

>Resumiendo:
- Controlador     |   Instanciable    |   PascalCase
- Todo lo demás   |   Singleton       |   camelCase


4) Hemos hablado de ngResource que es un wrapper del core service "$http". ¿Qué te parecería utilizar Restangular?

>Está bien. yo en los curos procuro usar las menos objetos de terceros. En este caso además estoy razonablemente satisfecho con *ngResources*

5) Para grandes aplicaciones, ¿sería aconsejable separar la lógica en varios módulos e introducirlos como dependencias del módulo que actúa de app? 
Ejemplo: módulo de autenticación, módulo de gestión de errores, etc.

>Por supuesto que si. Siempre es aconsejable modularizar las aplicaciones, por razones como:
- Reparto de tareas en equipos
- Creación de distribuciones parciales
- Facilidad para implementar *lazy loading* si fuese necesario

6) Cuando una aplicación empieza a crecer demasiado, ¿podríamos utilizar el módulo ocLazyLoad + RequireJS para el lazy loading de los módulos? así liberaríamos bytes al inicio de la aplicación y los módulos 
se cargarían cuando realmente fueran necesarios.

>Si, **ocLazyLoad** es una buena solución para implantar la carga dinámica de módulos


7) Para el tema del rendimiento del renderizado en cliente, lees por ahí que Twitter optó por realizar el renderizado en servidor, debido al pobre rendimiento que tenía realizándolo en cliente. 
Esto da que pensar... Entiendo que desarrollando una SPA con AngularJS, la única penalización de rendimiento la tendríamos al iniciar la aplicación (fase de bootstrap, de config, de run...), ya que 
una vez cargada, con las rutas y obtención de datos vía JSON contra API Rest iríamos muy rápidos.

>Las mejoras en rendimiento siempre hay que basarlas en métricas. No vale compara casos y menos el de sitios tan grandes como Twitter. Mi recomendaciones son:
    - Usar AngularJS >= 1.3 y la notación *bindOnce* {{::vm.value}} para imformes y datos de sólo lectura
    - Descargar la menos cantidad posible de información de cada vez (paginando y organizando la aplicación)
    - Descomponer los formularios grandes (más de 20 campos de entrada) en pequeños pasos tipo wizard 
    - No abusar de los filtros
    - Medir y detectar los *cuellos de botella*

8) Cuando tienes una pantalla con 3 subvistas, para no perder la información que actualmente tiene en memoria el Controller, se podría utilizar ui-router-extras con los "Sticky States". ¿Lo recomiendas? o por el contrario lo harías de otra forma.

>Recomiendo usar UI-router y seguir sus indicaciones para esos casos.
