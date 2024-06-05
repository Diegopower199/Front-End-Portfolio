import getApolloClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const query = gql`
    query character($id: ID!) {
      character(id: $id) {
        name
      }
    }
  `;

  const client = getApolloClient();

  const { data } = await client.query<{
    character: {
      name: string;
    };
  }>({
    query,
    variables: {
      id: Number(id),
    },
  });

  return {
    props: {
      name: data.character.name,
    },
  };
};

const Page: NextPage<{ name: string }> = (props: { name: string }) => {
  return (
    <>
      <Link href={"/"}>Pagina principal</Link>
      <h1>{props.name}</h1>
    </>
  );
};

export default Page;
