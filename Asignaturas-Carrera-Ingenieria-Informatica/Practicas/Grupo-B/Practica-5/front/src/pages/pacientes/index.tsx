import Link from "next/link";
import styled from "styled-components";

export default function Pacientes() {
  return (
    <>
      <Link href={"/"}>
        <BotonMenuPrincipal>Ir al menu principal</BotonMenuPrincipal>
      </Link>
      <DivGeneral>
        <h1>PACIENTES</h1>

        <DivBotones>
          <Link
            href={`/pacientes/availableSlots`}
            as={`/pacientes/availableSlots`}
          >
            <BotonEnlaces>Available Slots</BotonEnlaces>
          </Link>

          <Link href={`/pacientes/bookSlot`} as={`/pacientes/bookSlot`}>
            <BotonEnlaces>Book Slot</BotonEnlaces>
          </Link>
        </DivBotones>
      </DivGeneral>
    </>
  );
}

const DivGeneral = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DivBotones = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BotonEnlaces = styled.button`
  border: 1px solid #2e518b;
  padding: 10px;
  background-color: #2e518b;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "Helvetica", sans-serif;
  border-radius: 50px;
  font-size: 40px;
  margin: 20px;

  :hover {
    cursor: pointer;
  }
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
