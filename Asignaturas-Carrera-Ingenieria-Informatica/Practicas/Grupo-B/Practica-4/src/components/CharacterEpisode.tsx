import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

export type CharacterAPI = {
  name: string;
  id: string;
};

const CharacterEpisode: FC<{ id: string }> = ({ id }) => {
  const query = gql`
    query character($id: ID!) {
      episode(id: $id) {
        name
        id
        air_date
        characters {
          name
          id
        }
      }
    }
  `;

  const { loading, error, data } = useQuery<{
    episode: {
      name: string;
      id: string;
      air_date: string;
      characters: {
        name: string;
        id: string;
      }[];
    };
  }>(query, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  return (
    <div>
      <Link href={"/characters"}>Ir al menu principal</Link>
      <h1>Characters Episodes</h1>

      <DivInformacionPersonaje>
        <DivInformacionEspecifica>
          <h1>Nombre{data?.episode.name}</h1>
          <h1>Fecha de emision: {data?.episode.air_date}</h1>

          {data!.episode.characters.map((character: CharacterAPI) => {
            return (
              <>
                <ParrafoLink>
                  <Link
                    key={character.id}
                    href={`/character/[id]`}
                    as={`/character/${character.id}`}
                  >
                    {character.name}
                  </Link>
                </ParrafoLink>
              </>
            );
          })}
        </DivInformacionEspecifica>
      </DivInformacionPersonaje>
    </div>
  );
};

export default CharacterEpisode;

const ParrafoLink = styled.p`
  font-size: 20px;
  padding: 4px;
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
