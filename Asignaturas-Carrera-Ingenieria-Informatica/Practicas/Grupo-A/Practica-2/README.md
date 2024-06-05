## Practica 2

Para esta segunda practica se pide hacer una interfaz en Next.js para una agencia de viajes.

Los datos se almacenaran en una variable que sigue la siguiente estructura:

- Es un array de objetos, mínimo se tiene que cargar 5 destinos
- Los objetos lo forman las siguientes propiedades
  - id: único
  - titulo: lugar de destino. Ex: Madrid
  - descripción: descripción corta que no debe superar los 200 caracteres
  - descripción: descripción larga que debe ser superior a los 500 caracteres
  - imagen\_ corta: imagen descriptiva del viaje. Buscar imágenes libre de uso
  - imagen\_ larga: imagen descriptiva del viaje. Buscar imágenes libre de uso
  - Las imágenes se cargaran en formato url y deben de ser distintas

La aplicación constara de 2 paginas

- index: En esta pagina se cargara el listado y se mostraran todos los destinos
- viaje_detallado/id :Se mostrara el destino cuyo id coincida con el id de la url https://nextjs.org/docs/routing/dynamic-routes

En el índice se mostraran los destinos siguiendo esta estructura:

- Cada destino será una fila
- Cada fila tendrá un border estilo dashed
- Las esquinas de la fila deberá estar redondeada a 10px
- El titulo y la descripción corta deberá estar una debajo del otro
- La imagen se encontrara a la izquierda de la agrupación de titulo + descripción corta

En la pagina del detalle tendrá la siguiente estructura

- Debe haber un botón que nos permita volver al índice
- Aquí se mostrara en formato columna:
  - Imagen larga
  - Titulo
  - Descripción Larga
