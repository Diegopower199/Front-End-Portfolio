import Link from "next/link";
import { useEffect, useState } from "react";

type CharType = {
  name: string;
  id: string;
};

const Formulario = () => {
  const [data, setData] = useState<CharType[]>([]);
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const fetchData = async () => {
    try {
      const chars = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`
      );

      const json = await chars.json();

      const results = json.results.map((char: any) => ({
        id: char.id,
        name: char.name,
      }));

      setData(results);
    } catch (error) {
      setData([{ id: "0", name: "Error bajandome los personajes" }]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  if (data.length === 0) {
    return <>Loading data</>;
  }

  return (
    <>
      {data.map((item) => {
        return (
          <div>
            <Link key={item.id} href={`/character/${item.id}`}>
              {item.name}
            </Link>
          </div>
        );
      })}
      El nombre:{" "}
      <input
        type="text"
        placeholder="Nombre a buscar"
        onChange={(event) => setName(event.target.value)}
      ></input>
      <button
        onClick={() => {
          setPage(1);
          fetchData();
        }}
      >
        {" "}
        Buscar
      </button>
      <button onClick={() => setPage(page - 1)}>Anterior Pagina</button>
      <button onClick={() => setPage(page + 1)}>Siguiente Pagina</button>
    </>
  );
};

export default Formulario;
