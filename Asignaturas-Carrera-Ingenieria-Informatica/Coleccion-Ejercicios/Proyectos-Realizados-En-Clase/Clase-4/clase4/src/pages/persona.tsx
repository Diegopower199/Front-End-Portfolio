import Menu from "@/components/menu";
import Persona from "@/components/persona";
import Link from "next/link";

const DatosPersonales = () => {
  return (
    <>
      <div className="menu">
        <Menu />
      </div>
      <div className="persona">
        <Persona
          nombre="Alberto"
          apellidos="Valero"
          edad={34}
          telefono={12345678}
          email="avalero@nebrija.es"
        />
        <hr />
        <Link href="/"> Pagina principal </Link>
      </div>
    </>
  );
};

export default DatosPersonales;
