import { EpisodeAPIRest } from "@/types";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await res.json();

  data.episode = await Promise.all(
    data.episode.map(async (url: string) => {
      const res = await fetch(url);
      const json = await res.json();

      return await json;
    })
  );

  return {
    props: {
      data: data,
    },
  };
};

const Character: NextPage<{
  data: {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    image: string;
    episode: EpisodeAPIRest[];
    url: string;
    created: string;
  };
}> = (props: {
  data: {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    image: string;
    episode: EpisodeAPIRest[];
    url: string;
    created: string;
  };
}) => {
  return (
    <>
      <Link href={"/"}>Menu principal</Link>
      <TituloH1>INFORMACION DEL PERSONAJE</TituloH1>

      <DivInformacionPersonaje>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>ID: {props.data.id}</ParrafoDescripcion>
          <ParrafoDescripcion>Name: {props.data.name}</ParrafoDescripcion>
          <ParrafoDescripcion>Status: {props.data.status}</ParrafoDescripcion>
          <ParrafoDescripcion>Species: {props.data.species}</ParrafoDescripcion>
          <ParrafoDescripcion>Type: {props.data.type}</ParrafoDescripcion>
          <ParrafoDescripcion>Gender: {props.data.gender}</ParrafoDescripcion>
          <ParrafoDescripcion>Informacion Origin: </ParrafoDescripcion>
          <ul>
            <li>
              <ParrafoDescripcion>
                {" "}
                Url: {props.data.origin.url}{" "}
              </ParrafoDescripcion>
            </li>
            <li>
              <ParrafoDescripcion>
                {" "}
                Name: {props.data.origin.name}{" "}
              </ParrafoDescripcion>
            </li>
          </ul>
          <ParrafoDescripcion>Informacion Location: </ParrafoDescripcion>
          <ul>
            <li>
              <ParrafoDescripcion>
                {" "}
                Url: {props.data.location.url}{" "}
              </ParrafoDescripcion>
            </li>
            <li>
              <ParrafoDescripcion>
                {" "}
                Name: {props.data.location.name}{" "}
              </ParrafoDescripcion>
            </li>
          </ul>
          <ParrafoDescripcion>Informacion Episodes: </ParrafoDescripcion>
          <ul>
            {props.data.episode.map((episode) => {
              return (
                <li key={episode.id}>
                  <ParrafoDescripcion>
                    Id: {episode.id} {"  "} Name: {episode.name}{" "}
                  </ParrafoDescripcion>
                </li>
              );
            })}
          </ul>

          <ParrafoDescripcion>Created: {props.data.created}</ParrafoDescripcion>
        </DivInformacionEspecifica>

        <ImagenPersonaje
          src={props.data.image}
          alt={props.data.name}
          width={100}
          height={100}
        />
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
