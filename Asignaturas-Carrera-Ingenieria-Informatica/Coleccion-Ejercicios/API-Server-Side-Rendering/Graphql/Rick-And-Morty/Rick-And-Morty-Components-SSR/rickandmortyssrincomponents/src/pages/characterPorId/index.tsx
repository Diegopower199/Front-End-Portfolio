import CharacterComponent from "@/components/Character";
import getApolloClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  
  const query = gql`
    query character($id: ID!) {
      character(id: $id) {
        id
        name
        image
        status
        type
        gender
      }
    }
  `;

  const client = getApolloClient();

  const { data } = await client.query<{
    character: {
      results: {
        id: string;
        name: string;
        image: string;
        status: string;
        type: string;
        gender: string;
      };
    };
  }>({
    query,
    variables: {
      id: id,
    },
  });

  return {
    props: {
      results: data.character.results,
    },
  };
};

const Character = ({
  results,
}: {
  results: {
    id: string;
    name: string;
    image: string;
    status: string;
    type: string;
    gender: string;
  };
}) => {
  return <CharacterComponent results={results} />;
};

export default Character;
