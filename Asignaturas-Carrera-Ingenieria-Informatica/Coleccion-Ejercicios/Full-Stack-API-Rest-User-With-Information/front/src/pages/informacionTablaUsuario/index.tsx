import TablaInformacionUsuario from "@/components/TablaInformacionUsuario";
import Link from "next/link";

const informacionTablaUsuario = () => {
  return (
    <>
      <Link href={"./loginUser"}></Link>
      <TablaInformacionUsuario />
    </>
  );
};

export default informacionTablaUsuario;
