import getApolloClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

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

  const client = getApolloClient();

  const { data } = await client.query<{
    episode: {
      id: string;
      name: string;
      air_date: string;
      episode: string;
    };
  }>({
    query,
    variables: {
      id: id,
    },
  });

  return {
    props: {
      data: data.episode,
    },
  };
};

const EpisodePorId: NextPage<{
  data: { id: string; name: string; air_date: string; episode: string };
}> = (props: {
  data: { id: string; name: string; air_date: string; episode: string };
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

export default EpisodePorId;
