Se pide desarrollar una página web que tenga la siguiente funcionalidad y requisitos técnicos:

**Página "/characters"**
- Debe mostrar el listado de todos los personajes, incluyendo:
  - Foto miniatura
  - Nombre
- Los personajes se deben mostrar usando CSS Flex (columnas adaptativas al ancho de la pantalla) o Grid con 4 columnas.
- Debe haber un text-input para realizar una búsqueda por nombre.
- Los personajes deben estar paginados, pudiendo avanzar o retroceder de página.
- Al hacer click en un personaje se irá a la página **"/character/[id]"**
- El renderizado debe ser client-side
- Se debe consultar la API GraphQL de Ricky Morty (no se valorará la práctica si se hace con API Rest)

**Página "/character/[id]"**
- Página en la que se muestran los detalles de un personaje.
  - Foto
  - Nombre
  - Ubicación (localización)
  - Género
  - Listado de episodios
- Al pinchar sobre una ubicación se debe abrir la página **"/location/[id]"**
- Al pinchar sobre un episodio se debe abrir la página **"/episode/[id]"**
- La página se debe generar estáticamente, de modo que se generen todas las páginas de todos los personajes en tiempo de buildeo.

**Página "/location/[id]"**
- Página en la que se muestran los detalles de una ubicación.
  - Nombre
  - Dimensión
  - Listado de residentes (nombre)
- Al pinchar sobre un residente se debe abrir la página **"/character/[id]"**
- La página se debe generar ssr.

**Página "/episode/[id]"**
- Página en la que se muestran los detalles de un episodio.
  - Nombre
  - Fecha de emisión
  - Listado de personajes (nombre)
- Al pinchar sobre un personaje se debe abrir la página **"/character/[id]"**
- La página se debe generar csr.