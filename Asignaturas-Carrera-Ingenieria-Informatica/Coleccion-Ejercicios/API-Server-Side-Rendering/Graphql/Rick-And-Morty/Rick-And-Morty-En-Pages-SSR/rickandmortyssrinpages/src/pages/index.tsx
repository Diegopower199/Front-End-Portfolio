import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function Home() {
  const [numeroIdCharacter, setNumeroIdCharacter] = useState<number>(1);
  const [numeroIdLocation, setNumeroIdLocation] = useState<number>(1);
  const [numeroIdEpisode, setNumeroIdEpisode] = useState<number>(1);
  const [numeroPageCharacter, setNumeroPageCharacter] = useState<number>(1);
  const [numeroPageEpisode, setNumeroPageEpisode] = useState<number>(1);

  const [arrayIdCharacters, setArrayIdCharacters] = useState<number[]>([]);
  const [arrayIdLocation, setArrayIdLocation] = useState<number[]>([]);
  const [arrayIdEpisodes, setArrayIdEpisodes] = useState<string>("");
  return (
    <>
      <PosicionarLinks>
        <Parrafos>
          Numero id de character{" "}
          <input
            type="number"
            onChange={(event) =>
              setNumeroIdCharacter(Number(event.target.value))
            }
          ></input>{" "}
          <Link href={`/character/${numeroIdCharacter}`}>
            /character/{numeroIdCharacter}
          </Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero de pagina de characters{" "}
          <input
            type="number"
            onChange={(event) =>
              setNumeroPageCharacter(Number(event.target.value))
            }
          ></input>{" "}
          <Link href={`/characters/${numeroPageCharacter}`}>
            /characters/{numeroPageCharacter}
          </Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero ids de characters <input type="number"></input>{" "}
          <Link href={`/`}>NO ESTA HECHO</Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero id de location{" "}
          <input
            type="number"
            onChange={(event) =>
              setNumeroIdLocation(Number(event.target.value))
            }
          ></input>{" "}
          <Link href={`/location/${numeroIdLocation}`}>
            /location/{numeroIdLocation}
          </Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Todos los locations <Link href={`/locations`}>/locations</Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero ids de locations <input type="number"></input>{" "}
          <Link href={`/`}>NO ESTA HECHO</Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero id de episode{" "}
          <input
            type="number"
            onChange={(event) => setNumeroIdEpisode(Number(event.target.value))}
          ></input>{" "}
          <Link href={`/episode/${numeroIdEpisode}`}>
            /episode/{numeroIdEpisode}
          </Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero de pagina de episodes{" "}
          <input
            type="number"
            onChange={(event) =>
              setNumeroPageEpisode(Number(event.target.value))
            }
          ></input>{" "}
          <Link href={`/episodes/${numeroPageEpisode}`}>
            /episodes/{numeroPageEpisode}
          </Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero ids de episodes{" "}
          <input
            type="text"
            onChange={(event) => {
              setArrayIdEpisodes(event.target.value);
            }}
          ></input>{" "}
          <Link href={`/episodesByIds/${arrayIdEpisodes}`}>NO ESTA HECHO</Link>
        </Parrafos>
      </PosicionarLinks>
    </>
  );
}

const PosicionarLinks = styled.div`
  display: flex;
  align-items: center;
`;

const Parrafos = styled.p`
  font-family: Arial, sans-serif;
  font-size: 18px;
  color: #333;
  line-height: 1.5em;
  text-align: justify;
  color: #2f2f2f;
  border-radius: 5px;
`;
