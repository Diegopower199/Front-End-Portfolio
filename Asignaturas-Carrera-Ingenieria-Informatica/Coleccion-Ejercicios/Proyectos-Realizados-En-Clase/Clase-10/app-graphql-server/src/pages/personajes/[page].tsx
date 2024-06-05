import getApolloClient from "@/libs/client";
import { CharacterAPI, Info } from "@/type";
import { gql } from "@apollo/client";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props: Array<{
    name: string;
    id: string;
    image: string;
    page: number;
  }> = [];

  const { page } = context.query;

  const query = gql`
    query{
      characters (page: ${page}){ 
        results{
          id
          name
          image
        }
        info {
          count
          next
          prev
        }
      }
    }
  `;

  const client = getApolloClient();

  const { data } = await client.query<{
    characters: {
      results: {
        id: string;
        name: string;
        image: string;
      }[];
      info: {
        count: number;
        next: string;
        prev: string;
      };
    };
  }>({
    query,
    variables: {
      page,
    },
  });

  return {
    props: {
      data: data.characters.results,
      info: data.characters.info,
    },
  };
};

const CharactersList = (props: { data: CharacterAPI[]; info: Info }) => {
  let page = 1;

  return (
    <div>
      <h1>Characters Lists</h1>

      <DivPersonajes>
        {props.data.map((character) => {
          return (
            <DivPersonajeUnicoLink>
              {}

              <Link
                key={character.id}
                href={`/personaje/[id]`}
                as={`/personaje/${character.id}`}
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
          <Link style={links} href={`/personajes/${page - 1}`}>
            Anterior
          </Link>
        </DivClickPaginas>
        <DivClickPaginas botonPaginaValida={page !== 6}>
          <Link style={links} href={`/personajes/${page + 1}`}>
            Siguiente
          </Link>
        </DivClickPaginas>
      </BotonPaginas>
    </div>
  );
};

export default CharactersList;

const links: React.CSSProperties = {
  textDecoration: "none",
  color: "black",
};

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

const BotonPaginas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
`;
