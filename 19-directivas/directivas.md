Directivas
==========

- Se usan de forma **declarativa** en el HTML
- Su función es extender y enriquecer el HTML encapsulando el **acceso al DOM**
- Se definen como **objetos JS** con propiedades específicas

Propiedades
-----------

### Restrict
Sirve para determinar dónde se puede aplicar la directiva

Valores posibles:

 - **A** – Attribute ` <div rating> `
 - **E** – Element ` <rating> `
 - **C** – Class ` <div class=”rating”> `
 - **M** – Comment ` <!– directive: rating –> `

### Replace
Indica si el elemento al que se aplica debe ser sustituído por el resultado de la ejecución

### Transclude
Indica si el elemento al que se aplicaca incluirá el resultado de la ejecución de la directiva en su interior

### Template y template URL
Cadena de texto o enlace a fichero que contine el HTML que va a devolver la directiva

### Scope
Intercambio de datos con el elemento que declara la directiva.
Valores posibles:

 - **@** Interpolating, para enlazar un texto dentro de la directiva. ` scope: { soloLectura: '@' } `
 - **=** Data bind, un objeto para doble-enlace que la directiva pueda cambiar ` scope: { valor: '=alias' } `
 - **&** Expression `scope: { onEvaluado: '&' } `


### Link
Una función que enlazará la directiva con el scope

### Compile
Una función que podrá manipular el DOM creando una función link

### Controller
Una función que actuará como contrlador para esta directiva 
