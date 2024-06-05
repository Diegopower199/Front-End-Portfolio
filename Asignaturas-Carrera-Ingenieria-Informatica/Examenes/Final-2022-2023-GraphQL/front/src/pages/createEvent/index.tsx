import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export type AddEventResponse = {
  createEvent: {
    id: string;
    title: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
  };
};

const AddEvent = () => {
  const mutation = gql`
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

  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");
  const [horaInicio, setHoraInicio] = useState<string>("");
  const [horaFinalizacion, setHoraFinalizacion] = useState<string>("");

  const [errorFecha, setErrorFecha] = useState<boolean>(false);
  const [errorHoraInicioFinalizacion, setErrorHoraInicioFinalizacion] =
    useState<boolean>(false);
  const [errorDatos, setErrorDatos] = useState<boolean>(false);

  const [addEventMutation, addEventMutationAnswer] =
    useMutation<AddEventResponse>(mutation, {
      errorPolicy: "all",
    });

  if (addEventMutationAnswer.loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Link href={"/"}>
        <BotonMenuPrincipal>Ir al menu principal</BotonMenuPrincipal>
      </Link>
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
                  setErrorDatos(true);
                  setErrorHoraInicioFinalizacion(false);
                  setErrorFecha(false);
                } else if (Number(yearSeleccionado) < 1970) {
                  setErrorFecha(true);
                  setErrorDatos(false);
                  setErrorHoraInicioFinalizacion(false);
                } else if (Number(horaInicio) >= Number(horaFinalizacion)) {
                  setErrorHoraInicioFinalizacion(true);
                  setErrorDatos(false);
                  setErrorFecha(false);
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
                  setErrorDatos(false);
                  setErrorFecha(false);
                  setErrorHoraInicioFinalizacion(false);

                  setTitulo("");
                  setDescripcion("");
                  setFecha("");
                  setHoraInicio("");
                  setHoraFinalizacion("");
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

      {addEventMutationAnswer.data === null ||
      addEventMutationAnswer.data === undefined ? (
        <></>
      ) : (
        <>
          <h2>Informacion añadida</h2>
          <DivElementosSlot>
            <DivElemento>
              <ParrafoTitulo>Titulo</ParrafoTitulo>
              <ParrafoValores>
                {addEventMutationAnswer.data.createEvent.title}
              </ParrafoValores>
            </DivElemento>

            <DivElemento>
              <ParrafoTitulo>Descripcion</ParrafoTitulo>
              <ParrafoValores>
                {addEventMutationAnswer.data.createEvent.description}
              </ParrafoValores>
            </DivElemento>

            <DivElemento>
              <ParrafoTitulo>Fecha</ParrafoTitulo>
              <ParrafoValores>
                {addEventMutationAnswer.data.createEvent.date
                  .toString()
                  .substring(0, 10)}
              </ParrafoValores>
            </DivElemento>

            <DivElemento>
              <ParrafoTitulo>Inicio</ParrafoTitulo>
              <ParrafoValores>
                {addEventMutationAnswer.data.createEvent.startHour}
              </ParrafoValores>
            </DivElemento>

            <DivElemento>
              <ParrafoTitulo>Fin</ParrafoTitulo>
              <ParrafoValores>
                {addEventMutationAnswer.data.createEvent.endHour}
              </ParrafoValores>
            </DivElemento>
          </DivElementosSlot>
        </>
      )}
    </>
  );
};

export default AddEvent;

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
