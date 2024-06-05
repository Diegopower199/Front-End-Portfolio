import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

type AddEventResponse = {
  id: string;
  title: string;
  date: Date;
  init: number;
  end: number;
  participants: string[];
};

const AddEvent = () => {
  const router = useRouter();
  const [responseAddEvent, setResponseAddEvent] = useState<AddEventResponse>();
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [init, setInit] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [participant, setParticipant] = useState<string>("");

  const [auxDate, setAuxDate] = useState<Date>(new Date());

  const [errorBackCreateEvent, setErrorBackCreateEvent] = useState<{
    error: string | undefined;
  }>({
    error: undefined,
  });

  const createEvent = async () => {
    try {
      const objetoFecha = new Date(date);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          date: objetoFecha,
          init: parseInt(init),
          end: parseInt(end),
          participants: participants,
        }),
      };

      const response = await fetch(
        "http://localhost:4000/addEvent",
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();

        setResponseAddEvent(result);
        setErrorBackCreateEvent({ error: undefined });
      } else {
        const result = await response.json();

        setErrorBackCreateEvent({ error: result.message });
      }
    } catch (error) {}
  };

  useEffect(() => {
    setDate(
      `${auxDate.getFullYear()}-${(auxDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${auxDate.getDate().toString().padStart(2, "0")}`
    );
    setInit(String(auxDate.getHours()));
    setEnd(String(auxDate.getHours() + 1));
  }, []);

  return (
    <>
      <PurpleBorderMenu>
        <H1Titulo>Add Event</H1Titulo>
        <DivFormulario>
          <DivBotones>
            <InputSubmit
              type="submit"
              value={"Añadir"}
              onClick={async () => {
                try {
                  await createEvent();

                  setTitle("");
                  setDate(
                    `${auxDate.getFullYear()}-${(auxDate.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}-${auxDate
                      .getDate()
                      .toString()
                      .padStart(2, "0")}`
                  );
                  setInit(String(auxDate.getHours()));
                  setEnd(String(auxDate.getHours() + 1));
                  setParticipants([""]);
                  setParticipant("");
                } catch {}
              }}
            ></InputSubmit>
            <InputSubmit
              type="submit"
              value={"Cancelar"}
              onClick={async () => {
                router.push(`./`);
              }}
            ></InputSubmit>
          </DivBotones>
          <p>Los campos que tengan * son obligatorios</p>
          <DivElementoFormulario>
            <LabelIdentificar>Title *: </LabelIdentificar>
            <InputValores
              type="text"
              value={title}
              placeholder="Titulo"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></InputValores>
          </DivElementoFormulario>
          <DivElementoFormulario>
            <LabelIdentificar>Date *: </LabelIdentificar>
            <InputValores
              type="date"
              value={date}
              placeholder="Date"
              onChange={(event) => {
                setDate(event.target.value);
              }}
            ></InputValores>
          </DivElementoFormulario>

          <DivElementoFormulario>
            <LabelIdentificar>Init *: </LabelIdentificar>
            <InputValores
              type="number"
              value={init}
              placeholder="Init"
              onChange={(event) => {
                if (event.target.value.includes("-")) {
                  event.target.value = "";
                } else if (Number(event.target.value) >= 25) {
                  event.target.value = event.target.value.slice(0, 2);
                  if (Number(event.target.value) > 24) {
                    event.target.value = event.target.value.slice(0, 1);
                  }
                } else {
                  setInit(event.target.value);
                }
              }}
            ></InputValores>
          </DivElementoFormulario>
          <DivElementoFormulario>
            <LabelIdentificar>End *:</LabelIdentificar>
            <InputValores
              type="number"
              value={end}
              placeholder="End"
              onChange={(event) => {
                if (event.target.value.includes("-")) {
                  event.target.value = "";
                } else if (Number(event.target.value) >= 25) {
                  event.target.value = event.target.value.slice(0, 2);
                  if (Number(event.target.value) > 24) {
                    event.target.value = event.target.value.slice(0, 1);
                  }
                } else {
                  setEnd(event.target.value);
                }
              }}
            ></InputValores>
          </DivElementoFormulario>
          <LabelIdentificar>Participantes: </LabelIdentificar>
          <ul>
            {participants.map((participante) => {
              return (
                <>
                  <li>{participante}</li>
                </>
              );
            })}
          </ul>
          <DivElementoFormulario>
            <InputValores
              type="text"
              value={participant}
              placeholder="Invitados"
              onChange={(event) => {
                setParticipant(event.target.value);
              }}
            ></InputValores>
            <button
              onClick={() => {
                setParticipants([...participants, participant]);
                setParticipant("");
              }}
            >
              Añadir participante
            </button>
          </DivElementoFormulario>

          {participants.toString()}
          {errorBackCreateEvent.error !== undefined ? (
            <>
              <ParrafoErrores>{errorBackCreateEvent.error}</ParrafoErrores>
            </>
          ) : (
            <></>
          )}
        </DivFormulario>
      </PurpleBorderMenu>
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

const DivBotones = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
