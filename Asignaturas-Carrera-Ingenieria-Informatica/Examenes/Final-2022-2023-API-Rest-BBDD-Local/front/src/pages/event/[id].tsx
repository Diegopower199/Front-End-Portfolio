import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

type Evento = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: Date;
  inicio: number;
  fin: number;
  invitados: string[];
};

const Event = () => {
  const [data, setData] = useState<Evento | undefined>(undefined);
  const [errorBack, setErrorBack] = useState<{ error: string | undefined }>({
    error: undefined,
  });
  const [errorDatos, setErrorDatos] = useState<boolean>(false);

  const eventById = async (id: string) => {
    try {
      const requestOptions = {
        method: "GET",
      };

      const response = await fetch(
        `http://localhost:8080/event/${id}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();

        setData(result);
        setErrorBack({ error: undefined });
      } else {
        setErrorBack({ error: await response.text() });
        setData(undefined);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const id = location.pathname.split("/").pop();
    if (id === undefined) {
      setErrorDatos(true);
    } else {
      eventById(id);
    }

    const intervalId = setInterval(() => {
      if (id === undefined) {
        setErrorDatos(true);
      } else {
        eventById(id);
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Link href={"/events"}>
        <BotonMenuPrincipal>
          Ir donde estan todos los eventos
        </BotonMenuPrincipal>
      </Link>
      <h1>Informacion del evento </h1>

      {errorBack.error !== undefined ? (
        <>
          <ErrorMessage>{errorBack.error}</ErrorMessage>
        </>
      ) : (
        <>
          {!data ? (
            <>Cargando informacion</>
          ) : (
            <>
              <DivElementosSlot>
                <DivElemento>
                  <ParrafoTitulo>Title</ParrafoTitulo>
                  <ParrafoValores>{data.titulo}</ParrafoValores>
                </DivElemento>

                <DivElemento>
                  <ParrafoTitulo>Description</ParrafoTitulo>
                  <ParrafoValores>{data.descripcion}</ParrafoValores>
                </DivElemento>

                <DivElemento>
                  <ParrafoTitulo>Date</ParrafoTitulo>
                  <ParrafoValores>
                    {data.fecha.toString().substring(0, 10)}
                  </ParrafoValores>
                </DivElemento>

                <DivElemento>
                  <ParrafoTitulo>Start hour</ParrafoTitulo>
                  <ParrafoValores>{data.inicio}</ParrafoValores>
                </DivElemento>

                <DivElemento>
                  <ParrafoTitulo>End hour</ParrafoTitulo>
                  <ParrafoValores>{data.fin}</ParrafoValores>
                </DivElemento>
              </DivElementosSlot>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Event;

const BotonMenuPrincipal = styled.div`
  border: 1px solid #2e518b;
  padding: 10px;
  background-color: #2e518b;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "Helvetica", sans-serif;
  border-radius: 50px;

  width: 180px;

  :hover {
    cursor: pointer;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
`;

const DivElementosSlot = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-around;
  align-items: center;
  flex-direction: row;
  background-color: #424632;
  margin: 5px;
`;

const DivElemento = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: aqua;

  border: black 5px solid;
  height: 81px;
  width: 96px;
`;

const ParrafoTitulo = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  border: black 5px solid;
  width: 91px;
  height: 70px;
  margin: 0px;
  background-color: blueviolet;
`;

const ParrafoValores = styled.p`
  font-family: Arial, sans-serif;
  font-size: 18px;
  color: #333;
  line-height: 1.6em;
  text-align: justify;
  color: #2f2f2f;
  border-radius: 5px;
`;
