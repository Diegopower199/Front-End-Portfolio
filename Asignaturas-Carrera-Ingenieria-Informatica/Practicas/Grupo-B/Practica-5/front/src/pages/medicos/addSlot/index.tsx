/*
  Explicacion de uso renderizado en el cliente: El renderizado es en cliente porque el usuario debe introducir valores en los input para añadir un Slot, 
  por lo que el usuario esta interactuando con la pagina web, ademas despues de que añada la informacion dando click al boton de añadir, 
  se muestra abajo los datos que se han añadido en el momento y ahí nos estamos creando nuevos elementos HTML.
  Tambien si no se se ha recargado la pagina tambien se muestra los anteriores.
  Ademas la pagina es dinamica ya que creamos nuevos elementos al añadir una hora disponible para mostrar que datos hemos añadido y se ha realizado correctamente
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
    dni?: string;
  }[];
};

const AddSlot = () => {
  const router = useRouter();

  const mutation = gql`
    mutation AddSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!) {
      addSlot(year: $year, month: $month, day: $day, hour: $hour) {
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
  const [hour, setHour] = useState<number>(0);
  const [informacionAdd, setInformacionAdd] = useState<
    { year: number; month: number; day: number; hour: number }[]
  >([]);

  const [mutateAddCorrect, setmutateAddCorrect] = useState<boolean>(false);

  const [mutateFunction, { data, loading, error }] = useMutation(mutation);

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
      <Link href={"/medicos"}>
        <BotonMenuPrincipal>Ir al menu principal de medico</BotonMenuPrincipal>
      </Link>
      <h1>Add slots</h1>
      <DivFormulario>
        <DivElementoFormulario>
          <LabelIdentificar>Fecha: </LabelIdentificar>{" "}
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

        <InputSubmit
          type="submit"
          value={"Añadir horario"}
          onClick={() => {
            if (year === 0 || month === 0 || day === 0 || hour === 0) {
              alert("No funciona bien");
              setmutateAddCorrect(false);
            } else {
              mutateFunction({
                variables: {
                  year: year,
                  month: month,
                  day: day,
                  hour: hour,
                },
              });

              setInformacionAdd([
                ...informacionAdd,
                { year: year, month: month, day: day, hour: hour },
              ]);
              setYear(0);
              setMonth(0);
              setDay(0);
              setHour(0);

              setmutateAddCorrect(true);
              alert("Se ha realizado correctamente");
            }
          }}
        ></InputSubmit>
      </DivFormulario>

      {mutateAddCorrect === true && (
        <>
          <h4>Informacion añadida</h4>

          {informacionAdd.map((info, index) => {
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

export default AddSlot;

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
