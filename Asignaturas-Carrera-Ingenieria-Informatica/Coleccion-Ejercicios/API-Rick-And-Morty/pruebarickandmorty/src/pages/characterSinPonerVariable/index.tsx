import getApolloClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async () => {
  const query = gql`
    query {
      character(id: 3) {
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
  });

  return {
    props: {
      name: data.character.name,
    },
  };
};

export default function CharacterSinVariable(props: { name: string }) {
  return (
    <>
      <Link href={"/"}>Pagina principal</Link>
      <h1>{props.name}</h1>
    </>
  );
}
