import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const BorrarInformacion = () => {
  const [idUsuario, setIdUsuario] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [usuarioCorrecta, setUsuarioCorrecta] = useState<boolean>(false);

  const fetchDeleteUser = async () => {
    const requestOptions = {
      method: "DELETE",
    };

    const response = await fetch(
      `http://localhost:8080/deleteUser?idUsuario=${idUsuario}`,
      requestOptions
    );

    await response.text();
    setUsuarioCorrecta(response.ok);
  };

  return (
    <>
      <Formulario>
        <TituloH1>Borrar información</TituloH1>
        <Contenedor>
          <ContenedorInput>
            <ImagenesIconos
              src={"/user-solid.png"}
              alt={"Esta cargando"}
            ></ImagenesIconos>
            <InputEmailUsuarioPassword
              type="text"
              placeholder="ID usuario"
              onChange={(event) => setIdUsuario(event.target.value)}
            />
          </ContenedorInput>

          <ContenedorInput>
            <ImagenesIconos
              src={"/lock-solid.png"}
              alt={"Esta cargando"}
            ></ImagenesIconos>
            <InputEmailUsuarioPassword
              type="password"
              placeholder="Contraseña"
              onChange={(event) => setContrasena(event.target.value)}
            />
          </ContenedorInput>

          <BotonLogin
            type="submit"
            value="Login"
            onClick={() => {
              fetchDeleteUser();
              {
                usuarioCorrecta === false &&
                  (alert("El usuario ya existe"), (<></>));
              }
              {
                usuarioCorrecta === true &&
                  (alert("El usuario no existe"), (<></>));
              }
            }}
          />
          <Parrafo>
            Al registrarte, aceptas nuestras Condiciones de uso y Política de
            privacidad.
          </Parrafo>
          <Parrafo>
            ¿No tienes una cuenta?{" "}
            <Link href={"./registrarUser"}>Registrate</Link>
          </Parrafo>
        </Contenedor>
      </Formulario>
    </>
  );
};

export default BorrarInformacion;

const Contenedor = styled.div`
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
`;

const Formulario = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  margin-top: 150px;
  margin-left: 200px;
  margin-right: 200px;
  padding: 3px;
  box-sizing: border-box;
`;

const TituloH1 = styled.h1`
  text-align: center;
  color: #1a2537;
  font-size: 40px;
  box-sizing: border-box;
`;

const InputEmailUsuarioPassword = styled.input`
  font-size: 20px;
  width: 800px;
  padding: 10px;
  border: none;
  box-sizing: border-box;
`;

const ContenedorInput = styled.div`
  margin-bottom: 15px;
  border: 1px solid #aaa;
  box-sizing: border-box;
`;

const ImagenesIconos = styled.img`
  margin: 3px;
  width: 40px;
  height: 60px;
  text-align: center;
  color: #999;
  box-sizing: border-box;
`;

const BotonLogin = styled.input`
  border: none;
  width: 100%;
  color: white;
  font-size: 20px;
  background: #1a2537;
  padding: 15px 20px;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  :hover {
    background: cadetblue;
  }
`;

const Parrafo = styled.p`
  text-align: center;
  box-sizing: border-box;
`;
