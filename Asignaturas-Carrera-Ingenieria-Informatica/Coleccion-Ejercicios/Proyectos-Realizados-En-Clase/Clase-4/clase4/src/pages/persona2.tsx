import Menu from "@/components/menu";
import Persona from "@/components/persona";
import Link from "next/link";

const DatosPersonales = () => {
  return (
    <>
      <Menu />
      <div className="persona">
        <Persona
          nombre="Victor"
          apellidos="Valero"
          edad={3}
          telefono={23423422}
          email="victor@nebrija.es"
        />
        <hr />
        <Link href="/"> Pagina principal </Link>
      </div>
    </>
  );
};

export default DatosPersonales;
