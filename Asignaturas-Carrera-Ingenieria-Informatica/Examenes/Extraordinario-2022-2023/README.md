#### Examen Extraordinaria

Se pide realizar una aplicación web con la misma funcionalidad (y distribución de páginas) que la siguiente: [https://front-tbyditz3fa-no.a.run.app/](https://front-tbyditz3fa-no.a.run.app/)

Como aspecto fundamental indicar que el front debe mostrar un mensaje de error cuando el API devuelve un error (debe ser un error controlado). No es necesario que el front revise los datos al añadir eventos, ya lo hace la API.

Se hace notar:

- Al añadir un evento aparece por defecto la fecha actual.
- Al añadir un evento aparece como hora inicial, por defecto, la hora actual.
- Al añadir un evento aparece como hora final, por defecto, la próxima hora.

Para ello se partirá del proyecto github xxxx que ya incluye el API Rest que se debe utilizar.

##### Los endpoints del API Rest son:

**Al lanzar el API con docker-compose en  local escuchará en http://localhost:4000**

**GET /events**

- Devuelve todos los eventos de un día que se pasa como parámetro, con el formato /events?date=yyyy-mm-dd
- Si no hay eventos ese día devuelve un array vacío.
- Devuelve los eventos ordenador por hora

**POST /addEvent**

Añade un evento cuyos datos se pasan a través del body, por ejemplo

{

"titulo":"Cena con Juan y Maria",  
   "fecha": "2023-06-25",  
   "inicio: 21,  
   "fin": 23,  
   "invitados": \["Juan", "Maria"\]  
}

El API realiza las siguientes comprobaciones, por lo que NO es necesario realizarlas en el front:

- La fecha y horas deben ser válidas
- Si la hora de finalización es igual o menor que la hora de inicio devuelve un error con status: 400
- Si hay un evento que se solape ese día (ojo, solapar no es que coincidan las horas, sino que haya solape temporal) devuelve un error con status: 400
- Si falta alguno de los datos (título, fecha, inicio, fin, invitados) devuelve un error con status: 400
- Si el evento se añade correctamente se debe devolver los datos del evento (incluyendo el id creado en Mongo) con status 200

**DELETE /deleteEvent/:id**

Borra el evento con id correspondiente, o si no existe un error con status 404.

##### Rúbrica de evaluación

- Se listan los eventos del día oportuno y se navega correctamente entre los distintos días con los botones "Día siguiente" y "Día anterior". Además existe un botón para añadir nuevos eventos.
- Se pueden borrar los eventos de la lista de eventos con el botón "borrar".
- Se pueden añadir los eventos y se gestionan los errores que devuelve el back.
