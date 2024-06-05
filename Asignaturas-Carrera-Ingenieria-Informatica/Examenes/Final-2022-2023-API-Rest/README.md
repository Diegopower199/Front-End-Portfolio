Se desea desarrollar un aplicación de gestión de calendario, que permita:

- Mostrar todos los eventos existentes a partir del día actual.
- Añadir un evento
- Borrar un evento

Los eventos constan de:

- Título
- Descripción
- Fecha
- Hora de inicio
- Hora de finalización

**No puede haber eventos que se solapen en el tiempo**

Para ello se proporciona una API con las siguietes queries y mutaciones

**events**

Devuelve todos los eventos a partir de la fecha actual. Los eventos están ordenados por fecha y hora.

**createEvent**

Crea un nuevo evento **siempre que no haya un evento que se solape** . Si hay algún evento que se solape devuelve un error.

**updateEvent**

Actualiza un evento con la siguiente gestión de errores.

- Si el evento no existe devuelve un error.
- Si al actualizarlo, el evento se solapa con otro evento, devuelve un error.

**deleteEvent**

Borra un evento **siempre que dicho evento exista**, si no, devuelve un error.

**NOTA**. Las fechas se guardan en la base de datos en formato `Date`, por lo que el alumno deberá ver cómo se gestionan los tipos de dato `Date` en front, así como el modo oportuno de pasárselos al back.

El alumno debe desarrollar el frontend que ofrezca dicha funcionalidad buscando tanto un código que sea efectivo como una experiencia de usuario que haga sencilla la funiconalidad para el usuario. No se prestará atención al CSS, pero si a la estrucutra de los datos y a la funcionalidad. Ejemplos de buena funcionalidad serían (no se limitan a estos):

- Los eventos se eliminan desde la lista de eventos existentes.
- Los elementos se actualizan haciendo click en el evento y mostrando su información en un formulario para poder modificarla.
- Si se añaden eventos que se solapan, se mostrará el error al usuario, indicando por qué no se puede añadir o modificar el evento.
- etc.

PUNTUACIÓN

- Se pueden añadir eventos, gestionando los errores cuando 2 eventos se solapan: 2 puntos.
- Se pueden eliminar eventos seleccionándolo de la lista de eventos: 2 puntos.
- Se pueden modificar eventos, a partir de un evento seleccionado y con el formulario pre-relleno con los valores actuales: 2 puntos.
- Se pueden ver los eventos existentes en una lista, ordenados por fecha y hora y agrupados por fechas: 2 puntos.
- La estructura y calidad del código y la elección de los componentes es adecuada: 2 puntos.
