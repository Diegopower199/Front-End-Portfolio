import Agenda from "@/components/agenda";
import { getClientSSR } from "@/utils/apolloclient";
import { gql } from "@apollo/client";

type GraphQLResponse = { getWords: { word: string }[] };

export async function getServerSideProps() {
  const query = gql`
    query {
      getWords {
        word
      }
    }
  `;

  const client = getClientSSR();

  const { data } = await client.query<GraphQLResponse>({
    query,
  });

  return {
    props: {
      data: data,
    },
  };
}

export default function Home(props: { data: GraphQLResponse }) {
  return (
    <>
      <Agenda data={props.data}></Agenda>
    </>
  );
}
