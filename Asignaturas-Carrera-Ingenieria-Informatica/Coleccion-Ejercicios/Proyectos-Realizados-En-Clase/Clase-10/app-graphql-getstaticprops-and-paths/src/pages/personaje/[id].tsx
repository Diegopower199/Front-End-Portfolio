import getApolloClient from "@/libs/client";
import { CharacterAPI } from "@/type";
import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getApolloClient();

  const { data } = await client.query({
    query: gql`
      query {
        characters {
          results {
            id
        }
      }
    `,
  });

  const paths = data.characters.results.map((character: CharacterAPI) => {
    return {
      params: {
        id: character.id,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id;

  const query = gql`
  query{
    characters (id: ${id}){ 
      results{
        name
      }
    }
  }
  `;

  const client = getApolloClient();

  const { data } = await client.query<{
    characters: {
      results: {
        name: string;
      }[];
    };
  }>({
    query,
    variables: {
      id,
    },
  });

  return {
    props: {
      data: data.characters.results,
    },
  };
};

const Character = (props: CharacterAPI) => {
  return (
    <>
      <Link href={"/"}>Ir al menu principal</Link>

      <TituloH1>INFORMACION DEL PERSONAJE</TituloH1>

      <DivInformacionPersonaje>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>Name: {props.name}</ParrafoDescripcion>
          <ParrafoDescripcion>Status: {props.status}</ParrafoDescripcion>
          <ParrafoDescripcion>Species: {props.species}</ParrafoDescripcion>
          <ParrafoDescripcion>Type: {props.type}</ParrafoDescripcion>
          <ParrafoDescripcion>Gender: {props.gender}</ParrafoDescripcion>
          <ParrafoDescripcion>Informacion Origin: </ParrafoDescripcion>
          <ul>
            <li>
              <ParrafoDescripcion> {props.origin.name} </ParrafoDescripcion>
            </li>
            <li>
              <ParrafoDescripcion> {props.origin.url} </ParrafoDescripcion>
            </li>
          </ul>
          <ParrafoDescripcion>Informacion Location: </ParrafoDescripcion>
          <ul>
            <li>
              <ParrafoDescripcion> {props.location.name} </ParrafoDescripcion>
            </li>
            <li>
              <ParrafoDescripcion> {props.location.url} </ParrafoDescripcion>
            </li>
          </ul>

          <ParrafoDescripcion>Informacion episodios: </ParrafoDescripcion>
          <ul>
            {props.episode.map((item, index) => {
              return (
                <li>
                  {" "}
                  <ParrafoDescripcion key={index}>
                    {" "}
                    {item}{" "}
                  </ParrafoDescripcion>{" "}
                </li>
              );
            })}
          </ul>
        </DivInformacionEspecifica>

        <ImagenPersonaje src={props.image} alt={props.name} />
      </DivInformacionPersonaje>
    </>
  );
};

export default Character;

const TituloH1 = styled.h1`
  display: flex;
  justify-content: center;
`;

const DivInformacionPersonaje = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;

  background-color: green;
`;

const DivInformacionEspecifica = styled.div`
  display: flex;
  justify-content: flex-start;

  flex-direction: column;
`;

const ParrafoDescripcion = styled.p`
  font: bold 100% monospace;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: white;
  font-size: 20px;
  text-decoration: none;
`;

const ImagenPersonaje = styled.img`
  width: 500px;
  height: 500px;
  text-decoration: none;
  justify-content: center;
  align-items: center;
`;
