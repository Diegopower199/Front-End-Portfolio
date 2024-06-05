import Image from "next/image";

type PersonaProps = {
  nombre: string;
  apellidos: string;
  edad: number;
  telefono: number;
  email: string;
};

const Persona = (props: PersonaProps) => {
  return (
    <>
      <Image src="/index.jpg" alt="una foto" width={200} height={200} />
      Nombre: {props.nombre}
      <br />
      Apellidos: {props.apellidos}
      <br />
      Edad: {props.edad}
      <br />
      Teléfono: {props.telefono}
      <br />
      Email: {props.email}
      <br />
    </>
  );
};

export default Persona;
