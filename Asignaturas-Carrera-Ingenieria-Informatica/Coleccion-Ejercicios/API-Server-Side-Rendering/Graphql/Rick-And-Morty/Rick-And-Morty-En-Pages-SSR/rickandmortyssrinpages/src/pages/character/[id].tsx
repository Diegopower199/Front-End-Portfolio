import getApolloClient from "@/libs/client";
import { CharacterAPI } from "@/types";
import { gql } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const query = gql`
    query character($id: ID!) {
      character(id: $id) {
        id
        name
        image
        status
        type
        gender
        species
        origin {
          id
          name
        }
        location {
          id
          name
        }
        episode {
          id
          name
        }
        created
      }
    }
  `;

  const client = getApolloClient();

  const { data } = await client.query<{
    character: {
      id: string;
      name: string;
      image: string;
      status: string;
      type: string;
      gender: string;
      species: string;
      origin: { id: string; name: string };
      location: { id: string; name: string };
      episode: string[];
      created: string;
    };
  }>({
    query,
    variables: {
      id: id,
    },
  });

  return {
    props: {
      results: data.character,
    },
  };
};

const CharacterPorId: NextPage<{ results: CharacterAPI }> = (props: {
  results: CharacterAPI;
}) => {
  return (
    <>
      <Link href={"/"}>Menu principal</Link>
      <TituloH1>INFORMACION DEL PERSONAJE</TituloH1>

      <DivInformacionPersonaje>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>ID: {props.results.id}</ParrafoDescripcion>
          <ParrafoDescripcion>Name: {props.results.name}</ParrafoDescripcion>
          <ParrafoDescripcion>
            Status: {props.results.status}
          </ParrafoDescripcion>
          <ParrafoDescripcion>
            Species: {props.results.species}
          </ParrafoDescripcion>
          <ParrafoDescripcion>Type: {props.results.type}</ParrafoDescripcion>
          <ParrafoDescripcion>
            Gender: {props.results.gender}
          </ParrafoDescripcion>
          <ParrafoDescripcion>Informacion Origin: </ParrafoDescripcion>
          <ul>
            <li>
              <ParrafoDescripcion>
                {" "}
                {props.results.origin.id}{" "}
              </ParrafoDescripcion>
            </li>
            <li>
              <ParrafoDescripcion>
                {" "}
                {props.results.origin.name}{" "}
              </ParrafoDescripcion>
            </li>
          </ul>
          <ParrafoDescripcion>Informacion Location: </ParrafoDescripcion>
          <ul>
            <li>
              <ParrafoDescripcion>
                {" "}
                ID: {props.results.location.id}{" "}
              </ParrafoDescripcion>
            </li>
            <li>
              <ParrafoDescripcion>
                {" "}
                Name: {props.results.location.name}{" "}
              </ParrafoDescripcion>
            </li>
          </ul>
          <ParrafoDescripcion>Informacion Episodes: </ParrafoDescripcion>
          <ul>
            {props.results.episode.map((episode) => (
              <li key={episode.id}>
                <ParrafoDescripcion>
                  Id: {episode.id} {episode.name}{" "}
                </ParrafoDescripcion>
              </li>
            ))}
          </ul>

          <ParrafoDescripcion>
            Created: {props.results.created}
          </ParrafoDescripcion>
        </DivInformacionEspecifica>

        <ImagenPersonaje
          src={props.results.image}
          alt={props.results.name}
          width={100}
          height={100}
        />
      </DivInformacionPersonaje>
    </>
  );
};

export default CharacterPorId;

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
