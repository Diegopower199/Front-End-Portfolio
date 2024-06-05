Se pide realizar un frontend en Next.js que consuma el API incluida en el proyecto.

El sistema se levantará usando el archivo docker-compose.yaml incluído.

La aplicacíon debe gestionar un sistema de citas médicas. 

Para ello debe ofrecer las siguientes funcionalidades. El alumno debe decidir cómo distribuir las funcionalidades en diferentes páginas y justificar si cada página será CSR, SSR o static. La justificación se hará con un comentario en el código al inicio de la página. Si no hay justificación o la justificación es incorrecta se puntuará sobre el 70%. 

#### `addSlot`
Permite al médico añadir un horario disponible para una cita. 

#### `removeSlot`
Permite al médico eliminar un horario disponible para una cita. 
  
#### `availableSlots`
Permite a un paciente consultar las citas disponibles en un determinado día o en un determinado mes. Devolverá un array de citas. Si no hay citas disponibles lo indicará

#### `bookSlot`
Permite al paciente reservar una cita concreta.
