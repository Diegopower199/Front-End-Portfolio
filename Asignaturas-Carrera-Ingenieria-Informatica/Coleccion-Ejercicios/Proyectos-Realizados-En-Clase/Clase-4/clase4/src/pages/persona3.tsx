import Menu from "@/components/menu";
import Persona from "@/components/persona";
import Link from "next/link";

const DatosPersonales = () => {
  return (
    <>
      <Menu />
      <div className="persona">
        <Persona
          nombre="pepe"
          apellidos="Villuela"
          edad={45}
          telefono={33254322}
          email="pepe@nebrija.es"
        />
        <hr />
        <Link href="/"> Pagina principal </Link>
      </div>
    </>
  );
};

export default DatosPersonales;
