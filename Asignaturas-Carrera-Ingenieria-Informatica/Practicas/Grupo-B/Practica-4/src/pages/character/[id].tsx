import getApolloClient from "@/libs/client";
import { CharacterAPI, EpisodeAPIRest } from "@/type";
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
          info {
            count
            pages
          }
        }
      }
    `,
  });

  const paths = [];

  for (let i = 1; i <= data.characters.info.pages; i++) {
    const { data: pageData } = await client.query({
      query: gql`
        query {
          characters(page: ${i}) {
            results {
              id
            }
          }
        }
      `,
    });
    const pagePaths = pageData.characters.results.map(
      (character: CharacterAPI) => ({
        params: {
          id: character.id,
        },
      })
    );
    paths.push(...pagePaths);
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id;

  const query = gql`
    query GetCharacter($id: ID!) {
      character(id: $id) {
        id
        name
        gender
        image
        location {
          id
          name
        }
        episode {
          id
          name
        }
      }
    }
  `;

  const client = getApolloClient();

  const { data } = await client.query<{
    character: {
      results: {
        id: string;
        name: string;
        gender: string;
        location: { id: string; name: string };
        episode: { id: string; name: string };
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
      data: data.character,
    },
  };
};

const Character = (props: { data: CharacterAPI }) => {
  return (
    <>
      <Link href={"/characters"}>Ir al menu principal</Link>

      <TituloH1>INFORMACION DEL PERSONAJE</TituloH1>

      <DivInformacionPersonaje>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>Name: {props.data.name}</ParrafoDescripcion>
          <ParrafoDescripcion>Gender: {props.data.gender}</ParrafoDescripcion>
          <ParrafoDescripcion>
            Location name:
            {props.data.location.name !== "unknown" && (
              <Link
                key={props.data.location.id}
                href={`/location/${props.data.location.id}`}
              >
                {props.data.location.name}
                <br />
              </Link>
            )}
            {props.data.location.name === "unknown" && (
              <ParrafoDescripcion>
                {" "}
                {props.data.location.name}
              </ParrafoDescripcion>
            )}
          </ParrafoDescripcion>

          <ParrafoDescripcion>Todos los episodios: </ParrafoDescripcion>

          {props.data.episode.map((episode: EpisodeAPIRest) => {
            return (
              <ul>
                <ParrafoDescripcion>
                  <Link key={episode.id} href={`/episode/${episode.id}`}>
                    {episode.name}
                    <br />
                  </Link>
                </ParrafoDescripcion>
              </ul>
            );
          })}
        </DivInformacionEspecifica>
      </DivInformacionPersonaje>
    </>
  );
};

export default Character;

const TituloH1 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DivInformacionPersonaje = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffdd0;
`;

const DivInformacionEspecifica = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: #808000;
`;

const ParrafoDescripcion = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  font: bold 100% monospace;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: white;
  font-size: 20px;
  text-decoration: none;
`;
