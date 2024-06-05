import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <DivGeneral>
        <h1>Sistema de citas médicas</h1>
        <DivBotones>
          <Link href={`/pacientes`} as={`/pacientes`}>
            <BotonEnlaces>Pacientes</BotonEnlaces>
          </Link>

          <Link href={`/medicos`} as={`/medicos`}>
            <BotonEnlaces>Medicos</BotonEnlaces>
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
