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

const Character: NextPage<{ id: string }> = (props: { id: string }) => {
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

  const { loading, error, data, refetch } = useQuery<{
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
      episode: { id: string; name: string }[];
      created: string;
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
      <TituloH1>INFORMACION DEL PERSONAJE</TituloH1>

      <DivInformacionPersonaje>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>ID: {data?.character.id}</ParrafoDescripcion>
          <ParrafoDescripcion>Name: {data?.character.name}</ParrafoDescripcion>
          <ParrafoDescripcion>
            Status: {data?.character.status}
          </ParrafoDescripcion>
          <ParrafoDescripcion>
            Species: {data?.character.species}
          </ParrafoDescripcion>
          <ParrafoDescripcion>Type: {data?.character.type}</ParrafoDescripcion>
          <ParrafoDescripcion>
            Gender: {data?.character.gender}
          </ParrafoDescripcion>
          <ParrafoDescripcion>Informacion Origin: </ParrafoDescripcion>
          <ul>
            <li>
              <ParrafoDescripcion>
                {" "}
                {data?.character.origin.id}{" "}
              </ParrafoDescripcion>
            </li>
            <li>
              <ParrafoDescripcion>
                {" "}
                {data?.character.origin.name}{" "}
              </ParrafoDescripcion>
            </li>
          </ul>
          <ParrafoDescripcion>Informacion Location: </ParrafoDescripcion>
          <ul>
            <li>
              <ParrafoDescripcion>
                {" "}
                ID: {data?.character.location.id}{" "}
              </ParrafoDescripcion>
            </li>
            <li>
              <ParrafoDescripcion>
                {" "}
                Name: {data?.character.location.name}{" "}
              </ParrafoDescripcion>
            </li>
          </ul>
          <ParrafoDescripcion>Informacion Episodes: </ParrafoDescripcion>
          <ul>
            {data?.character.episode.map((episode) => {
              return (
                <li key={episode.id}>
                  <ParrafoDescripcion>
                    Id: {episode.id} {episode.name}{" "}
                  </ParrafoDescripcion>
                </li>
              );
            })}
          </ul>

          <ParrafoDescripcion>
            Created: {data?.character.created}
          </ParrafoDescripcion>
        </DivInformacionEspecifica>

        <ImagenPersonaje
          src={data?.character.image}
          alt={data?.character.name}
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
