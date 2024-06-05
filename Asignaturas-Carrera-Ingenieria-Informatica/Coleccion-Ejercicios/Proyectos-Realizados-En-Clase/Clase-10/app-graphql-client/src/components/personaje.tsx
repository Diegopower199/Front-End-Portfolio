import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";

export type CharacterAPI = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

const Character = () => {
  const query = gql`
    query page($page: Int!) {
      characters(page: $page) {
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
  `;

  const [page, setPage] = useState<number>(1);
  const { loading, error, data } = useQuery<{
    characters: {
      results: {
        id: string;
        name: string;
        status: string;
        species: string;
        type: string;
        gender: string;
        origin: { name: string; url: string };
        location: { name: string; url: string };
        image: string;
        episode: string[];
        url: string;
        created: string;
      }[];
      info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
      };
    };
  }>(query, {
    variables: {
      page,
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
      {data!.characters.results.map((character: CharacterAPI) => {
        return <div>Character : {character.name}</div>;
      })}
      <Link href={`/page/${page + 1}`}>
        <button onClick={() => setPage(page + 1)}> Pag Siguiente</button>
      </Link>
      <Link href={`/page/${page - 1}`}>
        <button onClick={() => setPage(page - 1)}> Pag Anterior</button>
      </Link>
    </div>
  );
};

export default Character;
