import getApolloClient from "@/libs/client";
import { LocationAPIRest } from "@/type";
import { gql } from "@apollo/client";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import styled from "styled-components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;

  const query = gql`
    query location($id: ID!) {
      location(id: $id) {
        id
        name
        dimension
        residents {
          id
          name
        }
      }
    }
  `;

  const client = getApolloClient();

  const { data } = await client.query<{
    location: {
      id: string;
      name: string;
      dimension: string;
      residents: {
        name: string;
        id: string;
      }[];
    };
  }>({
    query,
    variables: {
      id,
    },
  });

  return {
    props: {
      data: data.location,
    },
  };
};

const idLocation = (props: { data: LocationAPIRest }) => {
  return (
    <>
      <Link href={"/characters"}>Ir al menu principal</Link>
      <h1>Informacion location</h1>
      <DivInformacionPersonaje>
        <DivInformacionEspecifica>
          <h1>{props.data.name}</h1>
          <h1>{props.data.dimension}</h1>

          {props.data.residents.map((resident) => {
            return (
              <>
                <ParrafoLink>
                  <Link
                    key={resident.id}
                    href={`/character/[id]`}
                    as={`/character/${resident.id}`}
                  >
                    {resident.name}
                  </Link>
                </ParrafoLink>
              </>
            );
          })}
        </DivInformacionEspecifica>
      </DivInformacionPersonaje>
    </>
  );
};

export default idLocation;

const ParrafoLink = styled.p`
  font-size: 20px;
  padding: 4px;
`;

const DivInformacionPersonaje = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffdd0;
`;

const DivInformacionEspecifica = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: #808000;
`;
