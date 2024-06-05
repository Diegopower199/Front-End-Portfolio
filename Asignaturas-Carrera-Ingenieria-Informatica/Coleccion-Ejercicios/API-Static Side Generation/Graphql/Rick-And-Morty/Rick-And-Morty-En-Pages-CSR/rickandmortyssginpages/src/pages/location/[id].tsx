import getClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import styled from "styled-components";

type LocationAPIRest = {
  location: {
    id: string;
    name: string;
    type: string;
    dimension: string;
    residents: { name: string; id: string }[];
    created: string;
  };
};

type Info = {
  locations: {
    info: {
      count: number;
    };
  };
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();

  let paths = [];

  const query = gql`
    query {
      locations {
        info {
          count
        }
      }
    }
  `;

  const { data } = await client.query<Info>({
    query,
  });

  for (let i = 1; i <= data.locations.info.count; i++) {
    paths.push({
      params: {
        id: i.toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params;

  const query = gql`
    query location($id: ID!) {
      location(id: $id) {
        id
        name
        type
        dimension
        residents {
          id
          name
        }
        created
      }
    }
  `;

  const client = getClient();

  const { data } = await client.query<LocationAPIRest>({
    query,
    variables: {
      id: parseInt(id),
    },
  });

  return {
    props: {
      location: data.location,
    },
  };
};

const LocationId: NextPage<LocationAPIRest> = (props) => {
  return (
    <>
      <Link href={"/locations"}>Ir al menu principal</Link>

      <TituloH1>INFORMACION DEL PERSONAJE</TituloH1>

      <DivInformacionPersonaje>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>Name: {props.location.name}</ParrafoDescripcion>
          <ParrafoDescripcion>Type: {props.location.type}</ParrafoDescripcion>
          <ParrafoDescripcion>
            Dimension: {props.location.dimension}
          </ParrafoDescripcion>

          {props.location.residents.map(
            (resident: { name: string; id: string }) => {
              return (
                <ul>
                  <ParrafoDescripcion>
                    <Link key={resident.id} href={`/location/${resident.id}`}>
                      {resident.name}
                      <br />
                    </Link>
                  </ParrafoDescripcion>
                </ul>
              );
            }
          )}
        </DivInformacionEspecifica>
      </DivInformacionPersonaje>
    </>
  );
};

export default LocationId;

const TituloH1 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
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

const ParrafoDescripcion = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  font: bold 100% monospace;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: white;
  font-size: 20px;
  text-decoration: none;
`;
