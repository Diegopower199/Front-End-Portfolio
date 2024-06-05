import { Destino } from "@/src/components/destinos";
import { info } from "@/src/data/info";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PaginaDestino() {
  const router = useRouter();
  const { id } = router.query;

  const destino: Destino | undefined = info.find((item) => {
    return item.id === (typeof id === "string" ? parseInt(id, 10) : id);
  });

  if (!destino) {
    return (
      <>
        <main>
          <div className={"error"}>
            <p className={"mensaje1"}>ERROR</p>
            <p className={"mensaje2"}>
              No se encontró el destino con el id {id}
            </p>
            <Link legacyBehavior href={`/`}>
              <button className={"boton"}>INDEX</button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Practica 2 - {destino.nombre}</title>
      </Head>
      <main className={"pagina_destino"}>
        <div className={"destino"}>
          <img className={"imagenLarga"} src={destino.imagenLarga} />
          <div className={"contenido"}>
            <div className={"nombre"}>{destino.nombre}</div>
            <div className={"descripcionLarga"}>{destino.descripcionLarga}</div>
          </div>
        </div>

        <Link legacyBehavior href={`/`}>
          <button className={"boton"}>INDEX</button>
        </Link>
      </main>
    </>
  );
}
