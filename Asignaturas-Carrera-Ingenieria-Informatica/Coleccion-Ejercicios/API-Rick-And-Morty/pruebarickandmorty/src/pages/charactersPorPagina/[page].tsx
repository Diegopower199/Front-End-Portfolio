import getApolloClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";

let pagina = 0;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page } = context.query;
  pagina = Number(page);

  const query = gql`
    query characters($page: Int!) {
      characters(page: $page) {
        results {
          id
          name
          status
        }
      }
    }
  `;

  const client = getApolloClient();

  const { data } = await client.query<{
    characters: {
      results: {
        id: string;
        name: string;
        status: string;
      }[];
    };
  }>({
    query,
    variables: {
      page: Number(page),
    },
  });

  return {
    props: {
      results: data.characters.results,
    },
  };
};

const Page: NextPage<{
  results: { id: string; name: string; status: string }[];
}> = (props: { results: { id: string; name: string; status: string }[] }) => {
  return (
    <>
      {props.results.map((character) => {
        return (
          <>
            <p>Id:{character.id}</p>
            <p>Name:{character.name}</p>
            <p>Status:{character.status}</p>
          </>
        );
      })}
    </>
  );
};

export default Page;
