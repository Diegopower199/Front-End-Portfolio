import getClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

type Episode = {
  episode: {
    id: string;
    name: string;
    air_date: string;
    episode: string;
    characters: {
      name: string;
      id: string;
    }[];
    created: string;
  };
};

type Info = {
  episodes: {
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
    query episodes {
      episodes {
        info {
          count
        }
      }
    }
  `;

  const { data } = await client.query<Info>({
    query,
  });

  for (let i = 1; i <= data.episodes.info.count; i++) {
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
    query episode($id: ID!) {
      episode(id: $id) {
        id
        name
        air_date
        episode
        characters {
          id
          name
        }
        created
      }
    }
  `;

  const client = getClient();

  const { data } = await client.query<Episode>({
    query,
    variables: {
      id: parseInt(id),
    },
  });

  return {
    props: {
      episode: data.episode,
    },
  };
};

const EpisodeId: NextPage<Episode> = (props) => {
  return (
    <>
      Name : {props.episode.name}
      <br />
      <br />
      <br />
      AirDate: {props.episode.air_date}
      <br />
      <br />
      <br />
      Created: {props.episode.created}
      <br />
      <br />
      <br />
      EpisodeCode: {props.episode.episode}
      <br />
      <br />
      <br />
      Characters:
      <ul>
        {props.episode.characters.map((character) => {
          return (
            <div key={character.id}>
              <Link href={`/character/${character.id}`}>{character.name}</Link>
              <br />
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default EpisodeId;
