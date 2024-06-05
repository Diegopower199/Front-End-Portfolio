import getApolloClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetStaticProps, NextPage } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const client = getApolloClient();

  const { data } = await client.query({
    query: gql`
      query {
        characters {
          results {
            id
            name
            status
            species
            type
            gender
            origin {
              name
            }
            location {
              name
            }
            image
            episode {
              id
            }
            created
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
};

type CharacterType = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
  episode: string[];
  created: string;
};

const Characters: NextPage<{ characters: CharacterType[] }> = ({
  characters,
}) => {
  return (
    <div>
      <h1>Characters</h1>
      <ul>
        {characters.map((character) => {
          return (
            <li key={character.id}>
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Characters;
