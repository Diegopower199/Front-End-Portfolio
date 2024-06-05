import { CharacterAPIRest } from "@/types";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
};

const Character: NextPage<{ id: string }> = (props: { id: string }) => {
  const [character, setCharacter] = useState<CharacterAPIRest | undefined>(
    undefined
  );

  const fetchCharacter = async () => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/${props.id}`
    );

    const data = await res.json();

    data.episode = await Promise.all(
      data.episode.map(async (url: string) => {
        const res = await fetch(url);
        const json = await res.json();

        return json;
      })
    );

    setCharacter(data);
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  if (!character) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Link href={"/"}>Menu principal</Link>
      <TituloH1>INFORMACION DEL PERSONAJE</TituloH1>

      <DivInformacionPersonaje>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>ID: {character.id}</ParrafoDescripcion>
          <ParrafoDescripcion>Name: {character.name}</ParrafoDescripcion>
          <ParrafoDescripcion>Status: {character.status}</ParrafoDescripcion>
          <ParrafoDescripcion>Species: {character.species}</ParrafoDescripcion>
          <ParrafoDescripcion>Type: {character.type}</ParrafoDescripcion>
          <ParrafoDescripcion>Gender: {character.gender}</ParrafoDescripcion>
          <ParrafoDescripcion>Informacion Origin: </ParrafoDescripcion>
          <ul>
            <li>
              <ParrafoDescripcion>
                {" "}
                Url: {character.origin.url}{" "}
              </ParrafoDescripcion>
            </li>
            <li>
              <ParrafoDescripcion>
                {" "}
                Name: {character.origin.name}{" "}
              </ParrafoDescripcion>
            </li>
          </ul>
          <ParrafoDescripcion>Informacion Location: </ParrafoDescripcion>
          <ul>
            <li>
              <ParrafoDescripcion>
                {" "}
                Url: {character.location.url}{" "}
              </ParrafoDescripcion>
            </li>
            <li>
              <ParrafoDescripcion>
                {" "}
                Name: {character.location.name}{" "}
              </ParrafoDescripcion>
            </li>
          </ul>
          <ParrafoDescripcion>Informacion Episodes: </ParrafoDescripcion>
          <ul>
            {character.episode.map((episode) => {
              return (
                <li key={episode.id}>
                  <ParrafoDescripcion>
                    Id: {episode.id} {"  "} Name: {episode.name}{" "}
                  </ParrafoDescripcion>
                </li>
              );
            })}
          </ul>

          <ParrafoDescripcion>Created: {character.created}</ParrafoDescripcion>
        </DivInformacionEspecifica>

        <ImagenPersonaje
          src={character.image}
          alt={character.name}
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
