import Link from "next/link";
import styled from "styled-components";

type ServerSideProps = {
  params: {
    id: string;
  };
};

export async function getServerSideProps(props: ServerSideProps) {
  const id = props.params.id;

  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const json = await res.json();

  return { props: json };
}

type CharacterProps = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

const Character = (props: CharacterProps) => {
  return (
    <>
      <Link href={"/"}>Ir al menu principal</Link>

      <TituloH1>INFORMACION DEL PERSONAJE</TituloH1>

      <DivInformacionPersonaje>
        <DivInformacionEspecifica>
          <ParrafoDescripcion>Name: {props.name}</ParrafoDescripcion>
          <ParrafoDescripcion>Status: {props.status}</ParrafoDescripcion>
          <ParrafoDescripcion>Species: {props.species}</ParrafoDescripcion>
          <ParrafoDescripcion>Type: {props.type}</ParrafoDescripcion>
          <ParrafoDescripcion>Gender: {props.gender}</ParrafoDescripcion>
          <ParrafoDescripcion>Informacion Origin: </ParrafoDescripcion>
          <ul>
            <li>
              <ParrafoDescripcion> {props.origin.name} </ParrafoDescripcion>
            </li>
            <li>
              <ParrafoDescripcion> {props.origin.url} </ParrafoDescripcion>
            </li>
          </ul>
          <ParrafoDescripcion>Informacion Location: </ParrafoDescripcion>
          <ul>
            <li>
              <ParrafoDescripcion> {props.location.name} </ParrafoDescripcion>
            </li>
            <li>
              <ParrafoDescripcion> {props.location.url} </ParrafoDescripcion>
            </li>
          </ul>

          <ParrafoDescripcion>Informacion episodios: </ParrafoDescripcion>
          <ul>
            {props.episode.map((item, index) => {
              return (
                <li>
                  {" "}
                  <ParrafoDescripcion key={index}>
                    {" "}
                    {item}{" "}
                  </ParrafoDescripcion>{" "}
                </li>
              );
            })}
          </ul>
        </DivInformacionEspecifica>

        <ImagenPersonaje src={props.image} alt={props.name} />
      </DivInformacionPersonaje>
    </>
  );
};

export default Character;

const TituloH1 = styled.h1`
  display: flex;
  justify-content: center;
`;

const DivInformacionPersonaje = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;

  background-color: green;
`;

const DivInformacionEspecifica = styled.div`
  display: flex;
  justify-content: flex-start;

  flex-direction: column;
`;

const ParrafoDescripcion = styled.p`
  font: bold 100% monospace;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: white;
  font-size: 20px;
  text-decoration: none;
`;

const ImagenPersonaje = styled.img`
  width: 500px;
  height: 500px;
  text-decoration: none;
  justify-content: center;
  align-items: center;
`;
