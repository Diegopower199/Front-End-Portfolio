import { Destino, Detalles } from "@/src/components/destinos";
import { info } from "@/src/data/info";
import Head from "next/head";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <Head>
        <title>Practica 2 - Index</title>
      </Head>
      <main>
        {info.map((destino: Destino) => (
          <Link legacyBehavior href={`/destino/${destino.id}`}>
            <div key={destino.id} className={"pagina_indice"}>
              <Detalles destino={destino} />
            </div>
          </Link>
        ))}
      </main>
    </>
  );
}
