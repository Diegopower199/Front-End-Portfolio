import getApolloClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const query = gql`
    query location($id: ID!) {
      location(id: $id) {
        id
        name
        type
        created
      }
    }
  `;

  const client = getApolloClient();

  const { data } = await client.query<{
    location: {
      id: string;
      name: string;
      type: string;
      created: string;
    };
  }>({
    query,
    variables: {
      id: id,
    },
  });

  return {
    props: {
      data: data.location,
    },
  };
};

const LocationPorId: NextPage<{
  data: { id: string; name: string; type: string; created: string };
}> = (props: {
  data: { id: string; name: string; type: string; created: string };
}) => {
  return (
    <>
      <Link href={"/"}>Menu principal</Link>
      <p>ID: {props.data.id}</p>
      <p>Name: {props.data.name}</p>
      <p>Type: {props.data.type}</p>
      <p>Created: {props.data.created}</p>
    </>
  );
};

export default LocationPorId;
