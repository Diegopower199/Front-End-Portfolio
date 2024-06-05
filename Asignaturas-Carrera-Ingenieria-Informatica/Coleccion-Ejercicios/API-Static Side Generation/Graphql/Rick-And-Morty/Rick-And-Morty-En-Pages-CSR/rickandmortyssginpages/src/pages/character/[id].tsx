import getClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import styled from "styled-components";

type Character = {
  character: {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: { name: string; url: string };
    location: { name: string; id: string };
    image: string;
    episode: EpisodeAPIRest[];
    url: string;
    created: string;
  };
};

export type EpisodeAPIRest = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  created: string;
};

type Info = {
  characters: {
    info: {
      count: number;
    };
  };
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();

  let paths = [];

  const query = gql`
    query {
      characters {
        info {
          count
        }
      }
    }
  `;

  const { data } = await client.query<Info>({
    query,
  });

  for (let i = 1; i <= data.characters.info.count; i++) {
    paths.push({
      params: {
        id: i.toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params;

  const query = gql`
    query ($id: ID!) {
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

  const client = getClient();

  const { data } = await client.query<Character>({
    query,
    variables: {
      id: parseInt(id),
    },
  });

  return {
    props: {
      character: data.character,
    },
  };
};

const CharacterId: NextPage<Character> = (props) => {
  return (
    <>
      <Link href={"/characters"}>Ir al menu principal</Link>

      <TituloH1>INFORMACION DEL PERSONAJE</TituloH1>

      <DivInformacionPersonaje>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>Name: {props.character.name}</ParrafoDescripcion>
          <ParrafoDescripcion>
            Gender: {props.character.gender}
          </ParrafoDescripcion>
          <ParrafoDescripcion>
            Location name:
            {props.character.location.name !== "unknown" && (
              <Link
                key={props.character.location.id}
                href={`/location/${props.character.location.id}`}
              >
                {props.character.location.name}
                <br />
              </Link>
            )}
            {props.character.location.name === "unknown" && (
              <ParrafoDescripcion>
                {" "}
                {props.character.location.name}
              </ParrafoDescripcion>
            )}
          </ParrafoDescripcion>

          <ParrafoDescripcion>Todos los episodios: </ParrafoDescripcion>

          {props.character.episode.map((episode: EpisodeAPIRest) => {
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

export default CharacterId;

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
