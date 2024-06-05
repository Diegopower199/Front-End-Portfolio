import { gql, useQuery } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
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
  const query = gql`
    query episode($id: ID!) {
      episode(id: $id) {
        id
        name
        air_date
        episode
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery<{
    episode: {
      id: string;
      name: string;
      air_date: string;
      episode: string;
    };
  }>(query, {
    variables: {
      id: props.id,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Upps. La vida es dura</div>;
  }

  return (
    <>
      <Link href={"/"}>Menu principal</Link>
      <TituloH1>Informacion del episodio</TituloH1>

      <DivInformacionEpisode>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>ID: {data?.episode.id}</ParrafoDescripcion>
          <ParrafoDescripcion>Name: {data?.episode.name}</ParrafoDescripcion>
          <ParrafoDescripcion>
            Episode: {data?.episode.episode}
          </ParrafoDescripcion>
          <ParrafoDescripcion>
            Air date: {data?.episode.air_date}
          </ParrafoDescripcion>
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
