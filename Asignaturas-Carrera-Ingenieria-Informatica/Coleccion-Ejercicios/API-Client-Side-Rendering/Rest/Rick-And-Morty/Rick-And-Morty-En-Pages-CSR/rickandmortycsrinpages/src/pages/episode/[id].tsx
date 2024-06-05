import { EpisodeAPIRest } from "@/types";
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

const EpisodePorId: NextPage<{ id: string }> = (props: { id: string }) => {
  const [episode, setEpisode] = useState<EpisodeAPIRest | undefined>(undefined);

  const fetchEpisode = async () => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/episode/${props.id}`
    );

    const data = await res.json();

    data.characters = await Promise.all(
      data.characters.map(async (url: string) => {
        const res = await fetch(url);
        const json = await res.json();

        return json;
      })
    );

    setEpisode(data);
  };

  useEffect(() => {
    fetchEpisode();
  }, []);

  if (!episode) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Link href={"/"}>Menu principal</Link>
      <TituloH1>Informacion del episodio</TituloH1>

      <DivInformacionEpisode>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>ID: {episode.id}</ParrafoDescripcion>
          <ParrafoDescripcion>Name: {episode.name}</ParrafoDescripcion>
          <ParrafoDescripcion>Air date: {episode.air_date}</ParrafoDescripcion>
          <ParrafoDescripcion>Informacion Characters: </ParrafoDescripcion>
          <ul>
            {episode.characters.map((character) => {
              return (
                <li key={character.id}>
                  <ParrafoDescripcion>
                    Id: {character.id} {character.name}{" "}
                  </ParrafoDescripcion>
                </li>
              );
            })}
          </ul>
          <ParrafoDescripcion>Episode: {episode.episode}</ParrafoDescripcion>
          <ParrafoDescripcion>Created: {episode.created}</ParrafoDescripcion>
        </DivInformacionEspecifica>
      </DivInformacionEpisode>
    </>
  );
};

export default EpisodePorId;

const TituloH1 = styled.h1`
  display: flex;
  justify-content: center;
`;

const DivInformacionEpisode = styled.div`
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
