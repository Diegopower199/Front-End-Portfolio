/*
  Explicacion de uso renderizado en el cliente: El renderizado es en cliente porque el usuario debe introducir valores en los input para mostrar las citas disponibles, 
  por lo que el usuario esta interactuando con la pagina web, ademas despues de que muestre las citas disponibles (si es que hay) las citas dando click al boton de consultar las citas, 
  se muestra abajo los datos que estan disponibles las citas en el momento y ahí nos estamos creando nuevos elementos HTML.
  Tambien si no se se ha recargado la pagina tambien se muestra los datos anteriores.
  Ademas la pagina es dinamica ya que creamos nuevos elementos al consultar las citas disponibles ya que dependiendo de los valores que ponga el usuario, el resultado es uno u otro
*/

import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export type Slot = {
  availableSlots: {
    day: number;
    month: number;
    year: number;
    hour: number;
    available: boolean;
    dni?: string;
  }[];
};

interface SlotQueryVariables {
  year: number;
  month: number;
  day?: number;
}

const SlotList = () => {
  const router = useRouter();

  const query = gql`
    query AvailableSlots($year: Int!, $month: Int!, $day: Int) {
      availableSlots(year: $year, month: $month, day: $day) {
        available
        day
        dni
        hour
        month
        year
      }
    }
  `;

  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);
  const [mostrarDatos, setMostrarDatos] = useState<boolean>(false);

  const variables: SlotQueryVariables = {
    year: year,
    month: month,
  };

  if (day >= 1 && day <= 24) {
    variables.day = day;
  }

  const { loading, error, data, refetch, called } = useQuery<
    Slot,
    SlotQueryVariables
  >(query, {
    variables: variables,
  });

  useEffect(() => {
    refetch(variables);
  }, [mostrarDatos]);

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
      <h1>Avialable slots</h1>
      <DivFormulario>
        <DivElementoFormulario>
          <LabelIdentificar>Year</LabelIdentificar>
          <InputValores
            type="text"
            placeholder="Year"
            onBlur={(event) => {
              setYear(Number(event.target.value));
            }}
          ></InputValores>
        </DivElementoFormulario>

        <DivElementoFormulario>
          <LabelIdentificar>Month:</LabelIdentificar>
          <InputValores
            type="text"
            placeholder="Month"
            onBlur={(event) => {
              setMonth(Number(event.target.value));
            }}
          ></InputValores>
        </DivElementoFormulario>

        <DivElementoFormulario>
          <LabelIdentificar>Day: </LabelIdentificar>
          <InputValores
            type="text"
            placeholder="Day"
            onBlur={(event) => {
              setDay(Number(event.target.value));
            }}
          ></InputValores>
        </DivElementoFormulario>

        <DivElementoFormulario>
          <InputSubmit
            type="submit"
            value={"Consultar las citas"}
            onClick={() => {
              setMostrarDatos(true);
              refetch();
            }}
          ></InputSubmit>
        </DivElementoFormulario>
      </DivFormulario>

      {data?.availableSlots.length === 0 && mostrarDatos === true && (
        <>
          <h4>Con esos datos no hay elementos</h4>
        </>
      )}

      {data?.availableSlots.length !== 0 && mostrarDatos === true && (
        <>
          {data?.availableSlots.map((info, index) => {
            return (
              <>
                <DivElementosSlot>
                  <h4>Consulta añadida {index + 1}</h4>

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
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default SlotList;

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

const DivElementosSlot = styled.div`
  display: flex;
  justify-content: space-around;
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
