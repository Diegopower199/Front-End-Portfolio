import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

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

type AddEventResponse = {
  createEvent: {
    id: string;
    title: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
  };
};

type RemoveEventResponse = {
  deleteEvent: {
    id: string;
    title: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
  };
};

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

const allFunctionsEvent = () => {
  const queryGetEvents = gql`
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

  const mutationCreateEvent = gql`
    mutation Mutation(
      $title: String!
      $description: String!
      $date: Date!
      $startHour: Int!
      $endHour: Int!
    ) {
      createEvent(
        title: $title
        description: $description
        date: $date
        startHour: $startHour
        endHour: $endHour
      ) {
        date
        description
        endHour
        id
        startHour
        title
      }
    }
  `;

  const mutationDeleteEvent = gql`
    mutation Mutation($deleteEventId: ID!) {
      deleteEvent(id: $deleteEventId) {
        date
        description
        endHour
        id
        startHour
        title
      }
    }
  `;

  const mutationUpdateEvent = gql`
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

  const getEventsQuery = useQuery<QueryResponse>(queryGetEvents, {
    fetchPolicy: "network-only",
  });

  const [addEventMutation, addEventMutationAnswer] =
    useMutation<AddEventResponse>(mutationCreateEvent, {
      errorPolicy: "all",
    });

  const [removeEventMutation, removeEventMutationAnswer] =
    useMutation<RemoveEventResponse>(mutationDeleteEvent, {
      errorPolicy: "all",
    });

  const [updateEventMutation, updateEventMutationAnswer] =
    useMutation<UpdateEventResponse>(mutationUpdateEvent, {
      errorPolicy: "all",
    });

  const [errorFechaUpdateEvent, setErrorFechaUpdateEvent] =
    useState<boolean>(false);
  const [errorFechaCreateEvent, setErrorFechaCreateEvent] =
    useState<boolean>(false);

  const [
    errorHoraInicioFinalizacionUpdateEvent,
    setErrorHoraInicioFinalizacionUpdateEvent,
  ] = useState<boolean>(false);
  const [
    errorHoraInicioFinalizacionCreateEvent,
    setErrorHoraInicioFinalizacionCreateEvent,
  ] = useState<boolean>(false);

  const [errorDatosUpdateEvent, setErrorDatosUpdateEvent] =
    useState<boolean>(false);
  const [errorDatosCreateEvent, setErrorDatosCreateEvent] =
    useState<boolean>(false);

  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");
  const [horaInicio, setHoraInicio] = useState<string>("");
  const [horaFinalizacion, setHoraFinalizacion] = useState<string>("");

  const [editIdSelected, setEditIdSelected] = useState<string>("");
  const [auxDate, setAuxDate] = useState<Date>(new Date());
  const [updateEventDate, setUpdateEventDate] = useState<string>("");
  const [updateEventTitle, setUpdateEventTitle] = useState<string>("");
  const [updateEventDesc, setUpdateEventDesc] = useState<string>("");
  const [updateEventStart, setUpdateEventStart] = useState<string>("");
  const [updateEventEnd, setUpdateEventEnd] = useState<string>("");

  return (
    <>
      <Link href={"/"}>
        <BotonMenuPrincipal>Ir al menu principal</BotonMenuPrincipal>
      </Link>
      <GreenBorderMenu>
        <H1Titulo>Events</H1Titulo>

        {getEventsQuery.error !== undefined ? (
          <>
            <ErrorMessage>{getEventsQuery.error.message}</ErrorMessage>
          </>
        ) : (
          <>
            {!getEventsQuery.data || getEventsQuery.data.events.length === 0 ? (
              <>
                <p>No hay ningun evento a partir de la fecha actual</p>
              </>
            ) : (
              <>
                {getEventsQuery.data?.events.map((event) => {
                  const date = new Date(event.date);

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

                        <BotonBorrar
                          onClick={async () => {
                            await removeEventMutation({
                              variables: {
                                deleteEventId: event.id,
                              },
                            });

                            if (event.id === editIdSelected) {
                              setEditIdSelected("");
                            }

                            await getEventsQuery.refetch();
                          }}
                        >
                          <ImagenesIconos
                            src={"/trash.png"}
                            alt={"Esta cargando"}
                          ></ImagenesIconos>
                        </BotonBorrar>

                        <BotonActualizar
                          onClick={() => {
                            setEditIdSelected(event.id);
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
      </GreenBorderMenu>

      {editIdSelected ? (
        <>
          <RedBorderMenu>
            <H1Titulo>Update event</H1Titulo>
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
                      setErrorDatosUpdateEvent(true);
                      setErrorHoraInicioFinalizacionUpdateEvent(false);
                      setErrorFechaUpdateEvent(false);
                    } else if (Number(yearSeleccionado) < 1970) {
                      setErrorFechaUpdateEvent(true);
                      setErrorDatosUpdateEvent(false);
                      setErrorHoraInicioFinalizacionUpdateEvent(false);
                    } else if (
                      Number(updateEventStart) >= Number(updateEventEnd)
                    ) {
                      setErrorHoraInicioFinalizacionUpdateEvent(true);
                      setErrorDatosUpdateEvent(false);
                      setErrorFechaUpdateEvent(false);
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
                          updateEventId: editIdSelected,
                          title: updateEventTitle,
                          description: updateEventDesc,
                          date: objetoFecha,
                          startHour: parseInt(updateEventStart),
                          endHour: parseInt(updateEventEnd),
                        },
                      });
                      if (updateEventMutationAnswer.error === undefined) {
                        setEditIdSelected("");
                      }
                      setErrorHoraInicioFinalizacionUpdateEvent(false);
                      setErrorDatosUpdateEvent(false);
                      setErrorFechaUpdateEvent(false);

                      await getEventsQuery.refetch();
                    }
                  } catch {}
                }}
              ></InputSubmit>

              {errorDatosUpdateEvent ? (
                <>
                  <ParrafoErrores>
                    Faltan datos obligatorios por poner
                  </ParrafoErrores>
                </>
              ) : errorFechaUpdateEvent ? (
                <>
                  <ParrafoErrores>
                    El año tiene que ser igua o superior a 1970
                  </ParrafoErrores>
                </>
              ) : errorHoraInicioFinalizacionUpdateEvent ? (
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
          </RedBorderMenu>
        </>
      ) : (
        <></>
      )}

      <PurpleBorderMenu>
        <H1Titulo>Add Event</H1Titulo>
        <DivFormulario>
          <p>Los campos que tengan * son obligatorios</p>
          <DivElementoFormulario>
            <LabelIdentificar>Titulo *: </LabelIdentificar>
            <InputValores
              type="text"
              value={titulo}
              placeholder="Titulo"
              onChange={(event) => {
                setTitulo(event.target.value);
              }}
            ></InputValores>
          </DivElementoFormulario>
          <DivElementoFormulario>
            <LabelIdentificar>Descripcion *: </LabelIdentificar>
            <InputValores
              type="text"
              value={descripcion}
              placeholder="Descripcion"
              onChange={(event) => {
                setDescripcion(event.target.value);
              }}
            ></InputValores>
          </DivElementoFormulario>

          <DivElementoFormulario>
            <LabelIdentificar>Fecha *: </LabelIdentificar>
            <InputValores
              type="date"
              value={fecha}
              placeholder="Date"
              onChange={(event) => {
                setFecha(event.target.value);
              }}
            ></InputValores>
          </DivElementoFormulario>

          <DivElementoFormulario>
            <LabelIdentificar>Hora de inicio *: </LabelIdentificar>
            <InputValores
              type="number"
              value={horaInicio}
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
                  setHoraInicio(event.target.value);
                }
              }}
            ></InputValores>
          </DivElementoFormulario>

          <DivElementoFormulario>
            <LabelIdentificar>Hora de finalizacion *:</LabelIdentificar>
            <InputValores
              type="number"
              value={horaFinalizacion}
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
                  setHoraFinalizacion(event.target.value);
                }
              }}
            ></InputValores>
          </DivElementoFormulario>
          <InputSubmit
            type="submit"
            value={"Añadir evento"}
            onClick={async () => {
              try {
                let yearSeleccionado = fecha.slice(0, 4);
                if (
                  titulo === "" ||
                  descripcion === "" ||
                  fecha === "" ||
                  horaInicio === "" ||
                  horaFinalizacion === ""
                ) {
                  setErrorDatosCreateEvent(true);
                  setErrorHoraInicioFinalizacionCreateEvent(false);
                  setErrorFechaCreateEvent(false);
                } else if (Number(yearSeleccionado) < 1970) {
                  setErrorFechaCreateEvent(true);
                  setErrorDatosCreateEvent(false);
                  setErrorHoraInicioFinalizacionCreateEvent(false);
                } else if (Number(horaInicio) >= Number(horaFinalizacion)) {
                  setErrorHoraInicioFinalizacionCreateEvent(true);
                  setErrorDatosCreateEvent(false);
                  setErrorFechaCreateEvent(false);
                } else {
                  await addEventMutation({
                    variables: {
                      title: titulo,
                      description: descripcion,
                      date: new Date(fecha),
                      startHour: Number(horaInicio),
                      endHour: Number(horaFinalizacion),
                    },
                  });
                  setErrorDatosCreateEvent(false);
                  setErrorFechaCreateEvent(false);
                  setErrorHoraInicioFinalizacionCreateEvent(false);

                  setTitulo("");
                  setDescripcion("");
                  setFecha("");
                  setHoraInicio("");
                  setHoraFinalizacion("");
                  await getEventsQuery.refetch();
                }
              } catch {}
            }}
          ></InputSubmit>

          {errorDatosCreateEvent ? (
            <>
              <ParrafoErrores>
                Faltan datos obligatorios por poner
              </ParrafoErrores>
            </>
          ) : errorFechaCreateEvent ? (
            <>
              <ParrafoErrores>
                El año tiene que ser igua o superior a 1970
              </ParrafoErrores>
            </>
          ) : errorHoraInicioFinalizacionCreateEvent ? (
            <>
              <ParrafoErrores>
                La hora de inicio es mayor o igual que la hora de finalizacion
              </ParrafoErrores>
            </>
          ) : addEventMutationAnswer.error ? (
            <>
              <ParrafoErrores>
                {addEventMutationAnswer.error.message}
              </ParrafoErrores>
            </>
          ) : (
            <></>
          )}
        </DivFormulario>
      </PurpleBorderMenu>
    </>
  );
};

export default allFunctionsEvent;

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

const PurpleBorderMenu = styled.div`
  font-weight: 600;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 100px;
  padding-right: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  overflow: hidden;
  white-space: nowrap;
  border: 7px solid #733bf6;
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

const BotonActualizar = styled.button`
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
