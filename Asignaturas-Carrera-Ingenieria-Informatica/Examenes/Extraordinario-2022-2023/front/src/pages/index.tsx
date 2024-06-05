import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

type GetEvento = {
  id: string;
  title: string;
  date: Date;
  init: number;
  end: number;
  participants: string[];
};

const days = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const Events = () => {
  const router = useRouter();
  const [data, setData] = useState<GetEvento[]>([]);
  const [errorBack, setErrorBack] = useState<{ error: string | undefined }>({
    error: undefined,
  });
  const [auxDate, setAuxDate] = useState<Date>(new Date());

  const removeEvent = async (idRemove: string) => {
    try {
      const requestOptions = {
        method: "DELETE",
      };

      const response = await fetch(
        `http://localhost:4000/deleteEvent/${idRemove}`,
        requestOptions
      );

      if (response.ok) {
        await response.text();

        setErrorBack({ error: undefined });
      } else {
        const result = await response.text();

        setErrorBack({ error: result });
      }
    } catch (error) {}
  };

  const allEvents = async () => {
    try {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        `http://localhost:4000/events?date=${auxDate}`,
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
  }, []);

  useEffect(() => {
    allEvents();
  }, [auxDate]);

  return (
    <>
      <DivBotones>
        <InputSubmit
          type="submit"
          value={"Dia anterior"}
          onClick={() => {
            let numericDay = auxDate.getDate() - 1;
            let numericMonth = auxDate.getMonth() + 1;
            let numericYear = auxDate.getFullYear();

            let primerDia = new Date(numericYear, numericMonth - 1, 1);
            let ultimoDia = new Date(numericYear, numericMonth, 0);

            if (numericDay < 1) {
              numericDay = ultimoDia.getDate();
              numericMonth = numericMonth - 1;

              if (numericMonth > 12) {
                numericMonth = 1;
                numericYear = numericYear + 1;
              }
            }

            setAuxDate(
              new Date(`${numericYear}/${numericMonth}/${numericDay}`)
            );
          }}
        ></InputSubmit>
        <InputSubmit
          type="submit"
          value={"Dia siguiente"}
          onClick={() => {
            let numericDay = auxDate.getDate() + 1;
            let numericMonth = auxDate.getMonth() + 1;
            let numericYear = auxDate.getFullYear();

            let primerDia = new Date(numericYear, numericMonth - 1, 1);
            let ultimoDia = new Date(numericYear, numericMonth, 0);

            if (numericDay > ultimoDia.getDate()) {
              numericDay = 1;
              numericMonth = numericMonth + 1;
              if (numericMonth > 12) {
                numericMonth = 1;
                numericYear = numericYear + 1;
              }
            } else if (numericDay < 1) {
              numericDay = ultimoDia.getDate();
              numericMonth = numericMonth - 1;

              if (numericMonth > 12) {
                numericMonth = 1;
                numericYear = numericYear + 1;
              }
            }

            setAuxDate(
              new Date(`${numericYear}/${numericMonth}/${numericDay}`)
            );
          }}
        ></InputSubmit>{" "}
        <InputSubmit
          type="submit"
          value={"Añadir nuevo evento"}
          onClick={async () => {
            router.push(`./createEvent`);
          }}
        ></InputSubmit>
      </DivBotones>
      <GreenBorderMenu>
        <H1Titulo>
          Events del dia {"  "}
          {days[auxDate.getDay()] +
            ", " +
            auxDate.getDate() +
            " de " +
            months[auxDate.getMonth()] +
            " de " +
            auxDate.getFullYear()}
        </H1Titulo>

        {errorBack.error !== undefined ? (
          <>
            <ErrorMessage>{errorBack.error}</ErrorMessage>
          </>
        ) : (
          <>
            {!data || data.length === 0 ? (
              <>
                <h1>No hay eventos con la fecha de hoy</h1>
              </>
            ) : (
              <>
                {data.map((event) => {
                  return (
                    <>
                      <DivElementosSlot>
                        <DivElemento>
                          <ParrafoTitulo>Title</ParrafoTitulo>
                          <ParrafoValores>{event.title}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Date</ParrafoTitulo>
                          <ParrafoValores>
                            {event.date.toString().substring(0, 10)}
                          </ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Init</ParrafoTitulo>
                          <ParrafoValores>{event.init}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>End</ParrafoTitulo>
                          <ParrafoValores>{event.end}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Invitados</ParrafoTitulo>
                          <ParrafoValores>
                            {event.participants.toString()}
                          </ParrafoValores>
                        </DivElemento>

                        <BotonBorrar
                          onClick={async () => {
                            await removeEvent(event.id);

                            await allEvents();
                          }}
                        >
                          <ParrafoValores>Borrar</ParrafoValores>
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

const InputSubmit = styled.input`
  border: none;
  padding: 10px 20px;
  color: white;
  font-size: 20px;
  background: #1a2537;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s;
  :hover {
    background: cadetblue;
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

const DivBotones = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
