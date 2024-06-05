import { LocationAPIRest } from "@/types";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const res = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
  const data = await res.json();

  data.residents = await Promise.all(
    data.residents.map(async (url: string) => {
      const res = await fetch(url);
      const json = await res.json();

      return json;
    })
  );

  return {
    props: {
      data: data,
    },
  };
};

const LocationPorId: NextPage<{ data: LocationAPIRest }> = (props: {
  data: LocationAPIRest;
}) => {
  return (
    <>
      <Link href={"/"}>Menu principal</Link>
      <TituloH1>Informacion de location</TituloH1>

      <DivInformacionLocation>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>ID: {props.data.id}</ParrafoDescripcion>
          <ParrafoDescripcion>Name: {props.data.name}</ParrafoDescripcion>
          <ParrafoDescripcion>Type: {props.data.type}</ParrafoDescripcion>
          <ParrafoDescripcion>
            Dimension: {props.data.dimension}
          </ParrafoDescripcion>

          <ul>
            <ParrafoDescripcion>Informacion Characters: </ParrafoDescripcion>
            {props.data.residents.map((character) => {
              return (
                <li key={character.id}>
                  <ParrafoDescripcion>
                    Id: {character.id} {character.name}{" "}
                  </ParrafoDescripcion>
                </li>
              );
            })}
          </ul>
          <ParrafoDescripcion>Created: {props.data.created}</ParrafoDescripcion>
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
