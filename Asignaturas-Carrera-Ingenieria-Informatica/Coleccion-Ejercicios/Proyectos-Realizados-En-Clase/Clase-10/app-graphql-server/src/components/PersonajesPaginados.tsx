import { CharactersAPI } from "@/type";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const getServerSideProps = async () => {
  const props: Array<{
    id: string;
  }> = [];

  try {
    const res = await fetch("https://rickandmortyapi.com/api/character?page=1");
    const data: CharactersAPI = await res.json();

    props.push(
      ...data.results.map((character) => {
        const id = character.id;

        return { id };
      })
    );
  } catch (error) {}

  return {
    props: {
      data: props,
    },
  };
};

type CharType = {
  name: string;
  id: string;
  image: string;
};

const PersonajesPaginados = (props: CharType) => {
  const [dataCharacter, setDataCharacter] = useState<CharType[]>([]);
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [botonPrevous, setBotonPrevous] = useState<boolean>(false);
  const [botonNext, setBotonNext] = useState<boolean>(true);

  useEffect(() => {
    if (page !== 1) {
      setBotonPrevous(true);
    } else {
      setBotonPrevous(false);
    }

    if (page !== 20) {
      setBotonNext(true);
    } else {
      setBotonNext(false);
    }
  }, [page]);

  if (dataCharacter.length === 0) {
    return <>Loading data</>;
  }

  return (
    <>
      <TituloH1>PERSONAJES RICK Y MORTY {props.id}</TituloH1>

      <DivPersonajes>
        {dataCharacter.map((item) => {
          return (
            <DivPersonajeUnicoLink>
              <Link
                key={item.id}
                href={`/character/[id]`}
                as={`/character/${item.id}`}
              >
                <DivPersonajeUnico>
                  <ImagenPersonaje
                    src={item.image}
                    alt={item.name}
                  ></ImagenPersonaje>

                  <TituloPersonaje> {item.name} </TituloPersonaje>
                </DivPersonajeUnico>
              </Link>
            </DivPersonajeUnicoLink>
          );
        })}
      </DivPersonajes>

      <DivBusqueda>
        <ParrafoNombre> Nombre personaje: </ParrafoNombre>{" "}
        <input
          type="text"
          placeholder="Nombre a buscar"
          onChange={(event) => setName(event.target.value)}
        ></input>
        <BotonClick
          botonPaginaValida={true}
          onClick={() => {
            setPage(1);

            window.scroll(0, 0);
          }}
        >
          {" "}
          Buscar
        </BotonClick>
      </DivBusqueda>

      <BotonPaginas>
        <BotonClick
          botonPaginaValida={botonPrevous}
          onClick={() => {
            setPage(page - 1);
            window.scroll(0, 0);
          }}
        >
          Anterior Pagina
        </BotonClick>

        <BotonClick
          botonPaginaValida={botonNext}
          onClick={() => {
            setPage(page + 1);
            window.scroll(0, 0);
          }}
        >
          Siguiente Pagina
        </BotonClick>
      </BotonPaginas>

      <p>ESTADO botonPrevous: {botonPrevous ? "True" : "False"}</p>
      <p>ESTADO botonNext: {botonNext ? "True" : "False"}</p>
    </>
  );
};

export default PersonajesPaginados;

const TituloH1 = styled.h1`
  display: flex;
  justify-content: center;
`;

const DivPersonajes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;

  justify-items: center;

  font-family: "Courier New", Courier, monospace;
  color: rgb(176, 176, 176);
  background-color: rgb(126, 21, 21);
`;

const DivPersonajeUnicoLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 300px;
  width: 300px;
  margin: 50px;
  text-decoration: none;

  :hover {
    background-color: #cc94547d;
  }

  :active :visited {
    text-decoration: none;
  }
`;

const DivPersonajeUnico = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 0px;
  margin: 0px;

  border: 2px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 300px;
  height: 300px;
  text-decoration: none;
`;

const ImagenPersonaje = styled.img`
  width: 200px;
  height: 200px;
  text-decoration: none;
`;

const TituloPersonaje = styled.p`
  font: bold 100% monospace;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: white;
  font-size: 20px;
  text-decoration: none;
`;

const DivBusqueda = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ParrafoNombre = styled.p`
  font: bold 100% monospace;
  text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: black;
  font-size: 20px;
`;

type InputProps = {
  botonPaginaValida: boolean;
};

const BotonClick = styled.button<InputProps>`
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  margin: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: ${(props) => (props.botonPaginaValida ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  outline: none;
  border-radius: 5px;
  border: 2px solid #212529;
  background: #212529;

  :active {
    background-color: red;
  }
`;

const BotonPaginas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px 10px;
`;
