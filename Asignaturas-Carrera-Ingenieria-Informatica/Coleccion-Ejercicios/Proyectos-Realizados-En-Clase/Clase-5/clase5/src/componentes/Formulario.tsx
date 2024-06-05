import { useState } from "react";
import styled from "styled-components";

export const Formulario = () => {
  const [edad, setEdad] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [emailError, setEmail] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const validate =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validate)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="nombre">
        Introdude tu nombre:{" "}
        <Input
          error={emailError}
          type="text"
          onChange={(event) => setNombre(event.target.value)}
        />{" "}
        <br />
      </div>
      <div className="apellido">
        Introdude tu apellido:{" "}
        <Input
          error={emailError}
          type="text"
          onChange={(event) => setApellido(event.target.value)}
        />{" "}
        <br />
      </div>
      <div className="edad">
        Introduce tu edad:{" "}
        <Input
          error={emailError}
          type="number"
          onChange={(event) => setEdad(parseInt(event.target.value))}
        />{" "}
        <br />
        {edad > 14 && (
          <>
            Introduce email:{" "}
            <Input
              error={emailError}
              type="email"
              className="email"
              placeholder="Enter your email"
              onBlur={(event) => setEmail(!validateEmail(event.target.value))}
              onChange={(evemt) => {
                if (emailError) {
                  setEmail(!validateEmail(evemt.target.value));
                }
              }}
            />
            <br />
            {emailError && <>El email es incorrecto</>}
          </>
        )}
      </div>
      <br /> <br /> <br />
      {edad > 18 ? (
        <div>Eres mayor de edad</div>
      ) : (
        <div>Eres menor de edad</div>
      )}
      <Div>
        <Div>
          Hola a todos <Input error={emailError} type="number" />
        </Div>
      </Div>
    </>
  );
};

type InputProps = {
  error: boolean;
};
const Input = styled.input<InputProps>`
  background-color: ${(props) => (props.error ? "red" : "white")};
`;

const Div = styled.div`
  background-color: red;
`;

export default Formulario;
