import { gql, useQuery } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
};

const LocationPorId: NextPage<{ id: string }> = (props: { id: string }) => {
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

  const { loading, error, data, refetch } = useQuery<{
    location: {
      id: string;
      name: string;
      type: string;
      created: string;
    };
  }>(query, {
    variables: {
      id: props.id,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Upps. La vida es dura</div>;
  }

  return (
    <>
      <Link href={"/"}>Menu principal</Link>
      <TituloH1>Informacion de location</TituloH1>

      <DivInformacionLocation>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>ID: {data?.location.id}</ParrafoDescripcion>
          <ParrafoDescripcion>Name: {data?.location.name}</ParrafoDescripcion>
          <ParrafoDescripcion>Type: {data?.location.type}</ParrafoDescripcion>
          <ParrafoDescripcion>
            Created: {data?.location.created}
          </ParrafoDescripcion>
        </DivInformacionEspecifica>
      </DivInformacionLocation>
    </>
  );
};

export default LocationPorId;

const TituloH1 = styled.h1`
  display: flex;
  justify-content: center;
`;

const DivInformacionLocation = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;

  background-color: green;
`;

const DivInformacionEspecifica = styled.div`
  display: flex;
  justify-content: flex-start;

  flex-direction: column;
`;

const ParrafoDescripcion = styled.p`
  font: bold 100% monospace;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: white;
  font-size: 20px;
  text-decoration: none;
`;
