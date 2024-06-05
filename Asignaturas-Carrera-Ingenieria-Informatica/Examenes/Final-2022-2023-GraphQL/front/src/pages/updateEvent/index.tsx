import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

type UpdateEventResponse = {
  updateEvent: {
    id: string;
    title: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
  };
};

type QueryResponse = {
  events: {
    id: string;
    title: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
  }[];
};

const UpdateEvent = () => {
  const mutation = gql`
    mutation Mutation(
      $updateEventId: ID!
      $title: String!
      $description: String!
      $date: Date!
      $startHour: Int!
      $endHour: Int!
    ) {
      updateEvent(
        id: $updateEventId
        title: $title
        description: $description
        date: $date
        startHour: $startHour
        endHour: $endHour
      ) {
        date
        endHour
        description
        id
        startHour
        title
      }
    }
  `;

  const query = gql`
    query Query {
      events {
        description
        date
        id
        endHour
        startHour
        title
      }
    }
  `;

  const [errorFecha, setErrorFecha] = useState<boolean>(false);
  const [errorHoraInicioFinalizacion, setErrorHoraInicioFinalizacion] =
    useState<boolean>(false);
  const [errorDatos, setErrorDatos] = useState<boolean>(false);

  const [editSelected, setEditSelected] = useState<string>("");

  const [auxDate, setAuxDate] = useState<Date>(new Date());

  const [updateEventDate, setUpdateEventDate] = useState<string>("");
  const [updateEventTitle, setUpdateEventTitle] = useState<string>("");
  const [updateEventDesc, setUpdateEventDesc] = useState<string>("");
  const [updateEventStart, setUpdateEventStart] = useState<string>("");
  const [updateEventEnd, setUpdateEventEnd] = useState<string>("");

  const [updateEventMutation, updateEventMutationAnswer] =
    useMutation<UpdateEventResponse>(mutation);
  const queryAnswer = useQuery<QueryResponse>(query, {
    fetchPolicy: "network-only",
  });

  if (updateEventMutationAnswer.loading) {
    <>Loading...</>;
  }

  return (
    <>
      <Link href={"/"}>
        <BotonMenuPrincipal>Ir al menu principal</BotonMenuPrincipal>
      </Link>
      <RedBorderMenu>
        <H1Titulo>Update Event</H1Titulo>

        {queryAnswer.error ? (
          <ErrorMessage>{queryAnswer.error.message}</ErrorMessage>
        ) : (
          <>
            {queryAnswer.data?.events.length === 0 ? (
              <>
                <p>No hay ningun evento a partir de la fecha actual</p>
              </>
            ) : (
              <>
                {queryAnswer.data?.events.map((event) => {
                  return (
                    <>
                      <DivElementosSlot>
                        <DivElemento>
                          <ParrafoTitulo>Title</ParrafoTitulo>
                          <ParrafoValores>{event.title}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Description</ParrafoTitulo>
                          <ParrafoValores>{event.description}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Date</ParrafoTitulo>
                          <ParrafoValores>
                            {event.date.toString().substring(0, 10)}
                          </ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Start hour</ParrafoTitulo>
                          <ParrafoValores>{event.startHour}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>End hour</ParrafoTitulo>
                          <ParrafoValores>{event.endHour}</ParrafoValores>
                        </DivElemento>

                        <BotonActualizar
                          onClick={() => {
                            const date = new Date(event.date);
                            setEditSelected(event.id);
                            setAuxDate(
                              new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate()
                              )
                            );
                            setUpdateEventDate(
                              `${date.getDate()}/${
                                date.getMonth() + 1
                              }/${date.getFullYear()}`
                            );
                            setUpdateEventTitle(event.title);
                            setUpdateEventDesc(event.description);
                            setUpdateEventStart(`${event.startHour}`);
                            setUpdateEventEnd(`${event.endHour}`);
                          }}
                        >
                          <ImagenesIconos
                            src={"/reservar.png"}
                            alt={"Esta cargando"}
                          ></ImagenesIconos>
                        </BotonActualizar>
                      </DivElementosSlot>
                    </>
                  );
                })}
              </>
            )}
          </>
        )}

        {editSelected ? (
          <>
            <DivFormulario>
              <p>Los campos que tengan * son obligatorios</p>
              <DivElementoFormulario>
                <LabelIdentificar>Titulo *: </LabelIdentificar>
                <InputValores
                  type="text"
                  value={updateEventTitle}
                  placeholder="Titulo"
                  onChange={(event) => {
                    setUpdateEventTitle(event.target.value);
                  }}
                ></InputValores>
              </DivElementoFormulario>
              <DivElementoFormulario>
                <LabelIdentificar>Descripcion *: </LabelIdentificar>
                <InputValores
                  type="text"
                  value={updateEventDesc}
                  placeholder="Descripcion"
                  onChange={(event) => {
                    setUpdateEventDesc(event.target.value);
                  }}
                ></InputValores>
              </DivElementoFormulario>

              <DivElementoFormulario>
                <LabelIdentificar>Fecha *: </LabelIdentificar>
                <InputValores
                  type="date"
                  defaultValue={auxDate.toISOString().substring(0, 10)}
                  placeholder="Date"
                  onChange={(event) => {
                    setUpdateEventDate(event.target.value);
                  }}
                ></InputValores>
              </DivElementoFormulario>

              <DivElementoFormulario>
                <LabelIdentificar>Hora de inicio *: </LabelIdentificar>
                <InputValores
                  type="number"
                  value={updateEventStart}
                  placeholder="Hora de inicio"
                  onChange={(event) => {
                    if (event.target.value.includes("-")) {
                      event.target.value = "";
                    } else if (Number(event.target.value) >= 25) {
                      event.target.value = event.target.value.slice(0, 2);
                      if (Number(event.target.value) > 24) {
                        event.target.value = event.target.value.slice(0, 1);
                      }
                    } else {
                      setUpdateEventStart(event.target.value);
                    }
                  }}
                ></InputValores>
              </DivElementoFormulario>

              <DivElementoFormulario>
                <LabelIdentificar>Hora de finalizacion *:</LabelIdentificar>
                <InputValores
                  type="number"
                  value={updateEventEnd}
                  placeholder="Hora de finalizacion"
                  onChange={(event) => {
                    if (event.target.value.includes("-")) {
                      event.target.value = "";
                    } else if (Number(event.target.value) >= 25) {
                      event.target.value = event.target.value.slice(0, 2);
                      if (Number(event.target.value) > 24) {
                        event.target.value = event.target.value.slice(0, 1);
                      }
                    } else {
                      setUpdateEventEnd(event.target.value);
                    }
                  }}
                ></InputValores>
              </DivElementoFormulario>
              <InputSubmit
                type="submit"
                value={"Actualizar evento"}
                onClick={async () => {
                  try {
                    let yearSeleccionado = updateEventDate.slice(0, 4);
                    if (
                      updateEventTitle === "" ||
                      updateEventDesc === "" ||
                      updateEventDate === "" ||
                      updateEventStart === "" ||
                      updateEventEnd === ""
                    ) {
                      setErrorDatos(true);
                      setErrorHoraInicioFinalizacion(false);
                      setErrorFecha(false);
                    } else if (Number(yearSeleccionado) < 1970) {
                      setErrorFecha(true);
                      setErrorDatos(false);
                      setErrorHoraInicioFinalizacion(false);
                    } else if (
                      Number(updateEventStart) >= Number(updateEventEnd)
                    ) {
                      setErrorHoraInicioFinalizacion(true);
                      setErrorDatos(false);
                      setErrorFecha(false);
                    } else {
                      let partesFecha = updateEventDate.split(/[\/-]/);
                      let day = "";
                      let month = "";
                      let year = "";

                      let fechaCorrecta = "";

                      if (updateEventDate.includes("/")) {
                        day = partesFecha[0];
                        month = partesFecha[1];
                        year = partesFecha[2];

                        fechaCorrecta = `${year}/${month
                          .toString()
                          .padStart(2, "0")}/${day
                          .toString()
                          .padStart(2, "0")}`;
                      } else if (updateEventDate.includes("-")) {
                        year = partesFecha[0];
                        month = partesFecha[1];
                        day = partesFecha[2];

                        let numericDay = parseInt(day, 10);
                        let numericMonth = parseInt(month, 10);
                        let numericYear = parseInt(year, 10);

                        numericDay = numericDay + 1;

                        if (numericDay > 31) {
                          numericDay = 1;
                          numericMonth = numericMonth + 1;
                          if (numericMonth > 12) {
                            numericMonth = 1;
                            numericYear = numericYear + 1;
                          }
                        }

                        fechaCorrecta = `${numericYear}/${numericMonth
                          .toString()
                          .padStart(2, "0")}/${numericDay
                          .toString()
                          .padStart(2, "0")}`;
                      }

                      const objetoFecha = new Date(fechaCorrecta);

                      await updateEventMutation({
                        variables: {
                          updateEventId: editSelected,
                          title: updateEventTitle,
                          description: updateEventDesc,
                          date: objetoFecha,
                          startHour: parseInt(updateEventStart),
                          endHour: parseInt(updateEventEnd),
                        },
                      });
                      if (updateEventMutationAnswer.error === undefined) {
                        setEditSelected("");
                      }
                      setErrorHoraInicioFinalizacion(false);
                      setErrorDatos(false);
                      setErrorFecha(false);

                      await queryAnswer.refetch();
                    }
                  } catch {}
                }}
              ></InputSubmit>

              {errorDatos ? (
                <>
                  <ParrafoErrores>
                    Faltan datos obligatorios por poner
                  </ParrafoErrores>
                </>
              ) : errorFecha ? (
                <>
                  <ParrafoErrores>
                    El año tiene que ser igua o superior a 1970
                  </ParrafoErrores>
                </>
              ) : errorHoraInicioFinalizacion ? (
                <>
                  <ParrafoErrores>
                    La hora de inicio es mayor o igual que la hora de
                    finalizacion
                  </ParrafoErrores>
                </>
              ) : updateEventMutationAnswer.error ? (
                <>
                  <ParrafoErrores>
                    {updateEventMutationAnswer.error.message}
                  </ParrafoErrores>
                </>
              ) : (
                <></>
              )}
            </DivFormulario>
          </>
        ) : (
          <></>
        )}
      </RedBorderMenu>
    </>
  );
};

export default UpdateEvent;

const RedBorderMenu = styled.div`
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
  border: 7px solid #e72720;
  border-radius: 15px;
  margin: 10px;
`;

const H1Titulo = styled.h1`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DivFormulario = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
  padding: 20px;
  margin: 20px auto;
  width: 50%;
  box-shadow: 0px 0px 10px #aaaaaa;
`;

const DivElementoFormulario = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  margin: 3px;
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

const LabelIdentificar = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #333333;
  font-weight: bold;
  margin: 2px;
`;
const InputValores = styled.input`
  padding: 15px;
  border: 1px solid #aaaaaa;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const ParrafoErrores = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  font-size: 20px;
  color: red;
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

export const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 600px;
`;

export const BotonActualizar = styled.button`
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
  line-height: 1.5em;
  text-align: justify;
  color: #2f2f2f;
  border-radius: 5px;
`;

const ImagenesIconos = styled.img`
  margin: 3px;
  width: 50px;
  height: 60px;
  text-align: center;
  color: #999;
  box-sizing: border-box;
`;
