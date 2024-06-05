import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

type GetEvento = {
  _id: string;
  titulo: string;
  descripcion: string;
  fecha: Date;
  inicio: number;
  fin: number;
  invitados: string[];
};

const Events = () => {
  const router = useRouter();
  const [data, setData] = useState<GetEvento[]>([]);
  const [errorBack, setErrorBack] = useState<{ error: string | undefined }>({
    error: undefined,
  });

  const allEvents = async () => {
    try {
      const requestOptions = {
        method: "GET",
      };

      const response = await fetch(
        "http://localhost:8080/events",
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();

        setData(result);
        setErrorBack({ error: undefined });
      } else {
        const result = await response.text();

        setErrorBack({ error: result });
      }
    } catch (error) {}
  };

  useEffect(() => {
    allEvents();
    const intervalId = setInterval(() => {
      allEvents();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Link href={"/"}>
        <BotonMenuPrincipal>Ir al menu principal</BotonMenuPrincipal>
      </Link>
      <GreenBorderMenu>
        <H1Titulo>Events</H1Titulo>

        {errorBack.error !== undefined ? (
          <>
            <ErrorMessage>{errorBack.error}</ErrorMessage>
          </>
        ) : (
          <>
            {!data || data.length === 0 ? (
              <>
                <h1>
                  No hay eventos con la fecha superior o igual a la fecha de hoy
                </h1>
              </>
            ) : (
              <>
                {data.map((event) => {
                  return (
                    <>
                      <DivElementosSlot>
                        <DivElemento>
                          <ParrafoTitulo>Title</ParrafoTitulo>
                          <ParrafoValores>{event.titulo}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Description</ParrafoTitulo>
                          <ParrafoValores>{event.descripcion}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Date</ParrafoTitulo>
                          <ParrafoValores>
                            {event.fecha.toString().substring(0, 10)}
                          </ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Start hour</ParrafoTitulo>
                          <ParrafoValores>{event.inicio}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>End hour</ParrafoTitulo>
                          <ParrafoValores>{event.fin}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Invitados</ParrafoTitulo>
                          <ParrafoValores>
                            {event.invitados.toString()}
                          </ParrafoValores>
                        </DivElemento>

                        <BotonBorrar
                          onClick={async () => {
                            router.push(`/event/${event._id}`);
                          }}
                        >
                          <ParrafoValores>
                            IR A LA PAGINA CON EL ID
                          </ParrafoValores>
                        </BotonBorrar>
                      </DivElementosSlot>
                    </>
                  );
                })}
              </>
            )}
          </>
        )}
      </GreenBorderMenu>
    </>
  );
};

export default Events;

const GreenBorderMenu = styled.div`
  font-weight: 600;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 100px;
  padding-right: 100px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: hidden;
  white-space: nowrap;
  border: 7px solid #43c54e;
  border-radius: 15px;
  margin: 10px;
`;

const H1Titulo = styled.h1`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const BotonBorrar = styled.button`
  font-weight: 600;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
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
