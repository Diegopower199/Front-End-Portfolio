# Practica 3

Para esta tercera practica se pide desarrollar una aplicación web que usara como API la siguiente: https://wizard-world-api.herokuapp.com/swagger/index.html

La pagina principal llamara a: /Houses y deberá mostrar el listado de casas:
Cada casa deberá contener la siguiente información:

- Nombre de la casa
- Fundador de la casa
- Habitación de la casa
- Un listado de traits
- Un listado de magos directores. Solo deberá aparecer el nombre

La segunda pagina deberá tener este enlace: /wizard/ y llamara al siguiente endpoint: /Wizards/ y deberá mostrar el listado de cada mago

- En cada mago deberá aparecer su nombre completo
- Cada mago será un enlace a la siguiente pagina

La tercera pagina deberá tener este enlace: /wizard/:id y llamara al siguiente endpoint: /Wizards/{id} y deberá:

- Mostrar el nombre del mago
- Mostrar el listado de elixiris
- En este listado se deberá mostrar el nombre
- Además servirá como enlace para la siguiente pagina

La cuarta pagina deberá tener este enlace: /elixiris/:id y llamara al siguiente endpoint: /Elixiris/{id} y deberá:

- Mostrar el detalle del elixir, es decir. Todos los datos que devuelva el api

Cosas a tener en cuenta:

- Mientras se cargan los datos deberá aparecer un spinner en toda la pantalla bloqueando la interacción.
- Se deberán controlar los errores de la API. Ejemplo un 404 si se busca un mago que no existe
