import { LocationAPIRest } from "@/types";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [location, setLocation] = useState<LocationAPIRest | undefined>(
    undefined
  );

  const fetchLocation = async () => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/location/${props.id}`
    );

    const data = await res.json();

    data.residents = await Promise.all(
      data.residents.map(async (url: string) => {
        const res = await fetch(url);
        const json = await res.json();

        return json;
      })
    );

    setLocation(data);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  if (!location) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Link href={"/"}>Menu principal</Link>
      <TituloH1>Informacion de location</TituloH1>

      <DivInformacionLocation>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>ID: {location.id}</ParrafoDescripcion>
          <ParrafoDescripcion>Name: {location.name}</ParrafoDescripcion>
          <ParrafoDescripcion>Type: {location.type}</ParrafoDescripcion>
          <ParrafoDescripcion>
            Dimension: {location.dimension}
          </ParrafoDescripcion>

          <ul>
            <ParrafoDescripcion>Informacion Characters: </ParrafoDescripcion>
            {location.residents.map((character) => {
              return (
                <li key={character.id}>
                  <ParrafoDescripcion>
                    Id: {character.id} {character.name}{" "}
                  </ParrafoDescripcion>
                </li>
              );
            })}
          </ul>
          <ParrafoDescripcion>Created: {location.created}</ParrafoDescripcion>
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
