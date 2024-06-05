import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

export type CharacterAPI = {
  name: string;
  image: string;
  id: string;
};

const CharacterList = () => {
  const query = gql`
    query page($page: Int!, $name: String!) {
      characters(page: $page, filter: { name: $name }) {
        results {
          name
          image
          id
        }
      }
    }
  `;

  const [page, setPage] = useState<number>(1);
  const [nombrePersonaje, setNombrePersonaje] = useState<string>("");
  const { loading, error, data, refetch } = useQuery<{
    characters: {
      results: {
        name: string;
        image: string;
        id: string;
      }[];
    };
  }>(query, {
    variables: {
      page,
      filter: { name: nombrePersonaje },
    },
  });

  useEffect(() => {
    refetch({
      name: nombrePersonaje,
    });
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (data?.characters.results.length === 0) {
    return (
      <>
        <h1>NO HAY INFORMACION de ese personaje buscado</h1>

        <ParrafoPaginaActual>
          Dale al siguiente boton para ir a la pagina 1 de los personajes{" "}
          <Link
            href={`/characters`}
            as={`/characters`}
            onClick={() => {
              setPage(1);
              setNombrePersonaje("");
            }}
          >
            AQUI
          </Link>{" "}
        </ParrafoPaginaActual>
      </>
    );
  } else {
    return (
      <div>
        <h1>Characters Lists</h1>

        {data?.characters.results.length}

        <DivPersonajes>
          {data!.characters.results.map((character: CharacterAPI) => {
            return (
              <DivPersonajeUnicoLink>
                <Link
                  key={character.id}
                  href={`/character/[id]`}
                  as={`/character/${character.id}`}
                >
                  <DivPersonajeUnico>
                    <ImagenPersonaje
                      src={character.image}
                      alt={character.name}
                    ></ImagenPersonaje>

                    <TituloPersonaje> {character.name} </TituloPersonaje>
                  </DivPersonajeUnico>
                </Link>
              </DivPersonajeUnicoLink>
            );
          })}
        </DivPersonajes>

        <BotonPaginas>
          <DivClickPaginas botonPaginaValida={page !== 1}>
            <Link href={`/characters`}>
              <BotonClick
                botonPaginaValida={page !== 1}
                onClick={() => setPage(page - 1)}
              >
                {" "}
                Pagina Anterior
              </BotonClick>
            </Link>
          </DivClickPaginas>

          <DivClickPaginas botonPaginaValida={page !== 42}>
            <Link href={`/characters`}>
              <BotonClick
                botonPaginaValida={page !== 42}
                onClick={() => setPage(page + 1)}
              >
                {" "}
                Pagina Siguiente
              </BotonClick>
            </Link>
          </DivClickPaginas>
        </BotonPaginas>

        <DivInputNombrePersonaje>
          <input
            type="text"
            onBlur={(event) => setNombrePersonaje(event.target.value)}
          ></input>
          <BotonBuscar onClick={() => refetch()}>Buscar personaje</BotonBuscar>
        </DivInputNombrePersonaje>

        <ParrafoPaginaActual>Pagina {page}</ParrafoPaginaActual>

        {nombrePersonaje}
      </div>
    );
  }
};

export default CharacterList;

const DivPersonajes = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  background-color: aqua;
  :hover {
    background-color: #208b167c;
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

type InputProps = {
  botonPaginaValida: boolean;
};

const DivClickPaginas = styled.div<InputProps>`
  text-decoration: none;
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

const BotonBuscar = styled.button`
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  margin: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
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

const DivInputNombrePersonaje = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ParrafoPaginaActual = styled.div`
  font: bold 100% monospace;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: black;
  font-size: 20px;
  text-decoration: none;
`;
