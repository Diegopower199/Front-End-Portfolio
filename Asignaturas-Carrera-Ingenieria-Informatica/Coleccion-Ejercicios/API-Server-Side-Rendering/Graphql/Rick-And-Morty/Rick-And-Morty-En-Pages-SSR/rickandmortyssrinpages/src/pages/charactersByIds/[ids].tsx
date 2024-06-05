import getApolloClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ids } = context.query;

  const query = gql`
    query episodesByIds($ids: [ID!]!) {
      episodesByIds(ids: $ids) {
        id
        name
        air_date
        episode
        created
      }
    }
  `;

  const client = getApolloClient();

  const { data } = await client.query<{
    episode: {
      id: string;
      name: string;
      air_date: string;
      episode: string;
      created: string;
    };
  }>({
    query,
    variables: {
      ids: ids,
    },
  });

  return {
    props: {
      data: data.episode,
    },
  };
};

const EpisodePorIds: NextPage<{
  data: {
    id: string;
    name: string;
    air_date: string;
    episode: string;
    created: string;
  };
}> = (props: {
  data: {
    id: string;
    name: string;
    air_date: string;
    episode: string;
    created: string;
  };
}) => {
  return (
    <>
      <Link href={"/"}>Menu principal</Link>
      <p>ID: {props.data.id}</p>
      <p>Name: {props.data.name}</p>
      <p>Air date: {props.data.air_date}</p>
      <p>Episode: {props.data.episode}</p>
    </>
  );
};

export default EpisodePorIds;
