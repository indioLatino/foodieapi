# foodie-api

Microservicio encargado de proporcionar funcionalidades relativos a las recetas para la aplicación Foodie.


## Prerequisitos

* Es obligatorio tener Nodejs instalado en el equipo. Puede encontrar las instrucciones de instalación para su sistema
operativo en el siguiente enlace [Nodejs](https://nodejs.org/en/download/package-manager/).

* Es recomendable tener previamente arrancado el proyecto grocery-api. En caso de no estar arrancado este proyecto, algunas llamadas
que consumen métodos de dicho api fallarán, pero dichos errores están debidamente capturados para evitar que el foodie-api se caiga.
Para saber cómo arrancar el grocery-api utilice el documento README.md ubicado en su directorio raíz.

## Arrancar la aplicación

Primeramente hay que posicionarse en el directorio de raíz del proyecto e instalar las dependecias ejecutando:
`npm install`
Una vez instaladas las dependencias ejecutar `node app.js` para arrancar la aplicación.

Deberá de imprimirse en el termina el siguiente mensaje: `foodieapi is up and listening on port numner 1234`
