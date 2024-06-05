import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [numeroId, setNumeroId] = useState<number>(1);
  const [numeroPagina, setNumeroPagina] = useState<number>(1);
  return (
    <>
      <Link href={"/characterPoniendoVariable"}>
        Character Poniendo una variable
      </Link>
      <br />
      <br />
      <br />
      <Link href={"/characterSinPonerVariable"}>
        Character sin poner una variable
      </Link>
      <br />
      <br />
      <br />
      <p>
        Introduce un numero (id) para ver su informacion{" "}
        <input
          type="number"
          onChange={(event) => setNumeroId(Number(event.target.value))}
        ></input>
      </p>
      <Link href={`/character/${numeroId}`}>
        Poner el character que quiera, ahora mismo la id es: ${numeroId}
      </Link>
      <br />
      <br />
      <br />
      <p>
        Introduce un numero (page) para ver todos los characters de esa pagina{" "}
        <input
          type="number"
          onChange={(event) => setNumeroPagina(Number(event.target.value))}
        ></input>
      </p>
      <Link href={`/charactersPorPagina/${numeroPagina}`}>
        Poner la pagina que quiera, la pagina que esta ahora es ${numeroPagina}
      </Link>
      HACER PARA QUE SE PUEDA TODO ESTO PERO EN COMPONENTES
    </>
  );
}
