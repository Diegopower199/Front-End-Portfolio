/*
  Explicacion de uso renderizado en el cliente: El renderizado es en cliente porque el usuario debe introducir valores en los input para reservar una cita concreta, 
  por lo que el usuario esta interactuando con la pagina web, ademas despues de que actualice las citas dando click al boton de reservar una cita concreta, 
  se muestra abajo los datos de que se han reservado una cita concreta en el momento y ahí nos estamos creando nuevos elementos HTML.
  Tambien si no se se ha recargado la pagina tambien se muestra los anteriores.
  Ademas la pagina es dinamica ya que creamos nuevos elementos al reservar una cita concreta para mostrar que datos hemos introducido y se ha realizado correctamente
*/

import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

export type Slot = {
  availableSlots: {
    day: number;
    month: number;
    year: number;
    hour: number;
    available: boolean;
    dni: string;
  }[];
};

const BookSlot = () => {
  const router = useRouter();

  const mutation = gql`
    mutation Mutation(
      $year: Int!
      $month: Int!
      $day: Int!
      $hour: Int!
      $dni: String!
    ) {
      bookSlot(year: $year, month: $month, day: $day, hour: $hour, dni: $dni) {
        available
        dni
        hour
        month
        year
        day
      }
    }
  `;

  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);
  const [hour, setHour] = useState<number>(0);
  const [dni, setDni] = useState<string>("");
  const [dniExpresionCorrecta, setDniExpresionCorrecta] =
    useState<boolean>(false);
  const [informacionReservarCita, setInformacionReservarCita] = useState<
    { dni: string; year: number; month: number; day: number; hour: number }[]
  >([]);

  const [mutateUpdateCorrect, setmutateUpdateCorrect] =
    useState<boolean>(false);

  const [mutateFunction, { data, loading, error }] = useMutation(mutation);

  const validateDni = (dni: string): boolean => {
    if (/^[0-9]{8}[BCDFGHJKLMNPRSTVWXYZ]{1}$/.test(dni)) {
      return true;
    } else {
      return false;
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <>
        <button onClick={() => router.reload()}>Reiniciar pagina</button>
        <h1>Error, {error.message}</h1>
      </>
    );
  }

  return (
    <>
      <Link href={"/pacientes"}>
        <BotonMenuPrincipal>
          Ir al menu principal de pacientes
        </BotonMenuPrincipal>
      </Link>
      <h1>Book Slot</h1>

      <DivFormulario>
        <DivElementoFormulario>
          <LabelIdentificar>Fecha: </LabelIdentificar>
          <InputValores
            type="date"
            placeholder="Date"
            onChange={(event) => {
              setYear(Number(event.target.value.slice(0, 4)));
              setMonth(Number(event.target.value.slice(5, 7)));
              setDay(Number(event.target.value.slice(8, 10)));
            }}
          ></InputValores>
        </DivElementoFormulario>

        <DivElementoFormulario>
          <LabelIdentificar>Hour: </LabelIdentificar>
          <InputValores
            type="number"
            placeholder="Hour"
            min={"1"}
            max={"24"}
            step={1}
            onChange={(event) => {
              if (event.target.value.includes("-")) {
                event.target.value = "";
              } else if (Number(event.target.value) >= 25) {
                event.target.value = event.target.value.slice(0, 2);
                if (Number(event.target.value) > 24) {
                  event.target.value = event.target.value.slice(0, 1);
                }
              } else {
                setHour(Number(event.target.value));
              }
            }}
          ></InputValores>
        </DivElementoFormulario>

        <DivElementoFormulario>
          <LabelIdentificar>Dni: </LabelIdentificar>
          <InputValores
            type="text"
            placeholder="DNI"
            minLength={9}
            maxLength={9}
            onBlur={(event) => {
              setDniExpresionCorrecta(validateDni(event.target.value));
              setDni(event.target.value);
            }}
          ></InputValores>
        </DivElementoFormulario>

        <InputSubmit
          type="submit"
          value={"Reservar cita"}
          onClick={() => {
            if (
              year === 0 ||
              month === 0 ||
              day === 0 ||
              hour === 0 ||
              dniExpresionCorrecta === false
            ) {
              alert("No funciona bien");
              setmutateUpdateCorrect(false);
            } else {
              mutateFunction({
                variables: {
                  year: year,
                  month: month,
                  day: day,
                  hour: hour,
                  dni: dni,
                },
              });

              setInformacionReservarCita([
                ...informacionReservarCita,
                { dni: dni, year: year, month: month, day: day, hour: hour },
              ]);

              setYear(0);
              setMonth(0);
              setDay(0);
              setHour(0);

              setmutateUpdateCorrect(true);
              alert("Se ha realizado correctamente");
            }
          }}
        ></InputSubmit>
      </DivFormulario>

      {mutateUpdateCorrect === true && (
        <>
          <h4>Informacion paciente reserva citas</h4>

          {informacionReservarCita.map((info, index) => {
            return (
              <>
                <DivElementosSlot>
                  <h4>Consulta eliminada {index + 1}</h4>

                  <DivElemento>
                    <ParrafoTitulo>Dni</ParrafoTitulo>
                    <ParrafoValores>{info.dni}</ParrafoValores>
                  </DivElemento>

                  <DivElemento>
                    <ParrafoTitulo>Year</ParrafoTitulo>
                    <ParrafoValores>{info.year}</ParrafoValores>
                  </DivElemento>

                  <DivElemento>
                    <ParrafoTitulo>Month </ParrafoTitulo>
                    <ParrafoValores>{info.month}</ParrafoValores>
                  </DivElemento>

                  <DivElemento>
                    <ParrafoTitulo>Day:</ParrafoTitulo>
                    <ParrafoValores>{info.day}</ParrafoValores>
                  </DivElemento>

                  <DivElemento>
                    <ParrafoTitulo>Hour</ParrafoTitulo>
                    <ParrafoValores>{info.hour}</ParrafoValores>
                  </DivElemento>
                </DivElementosSlot>
                <br />
                <br />
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default BookSlot;

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
const BotonMenuPrincipal = styled.div`
  border: 1px solid #2e518b;
  padding: 10px;
  background-color: #2e518b;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "Helvetica", sans-serif;
  border-radius: 50px;
  font-size: 15px;
  width: 280px;

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
  width: 91px;
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
