import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TablaInformacionUsuario = () => {
  const router = useRouter();

  const [initialized, setInitialized] = useState(false);

  const [rows, setRows] = useState<(string | number)[][]>([]);
  const [columns, setColumns] = useState<{ name: string; type: string }[]>([
    { name: "Nombre", type: "text" },
    { name: "Edad", type: "number" },
    { name: "Fecha de nacimiento", type: "date" },
  ]);
  const [newRow, setNewRow] = useState<(string | number)[]>(["", "", ""]);
  const [valueSelect, setValueSelect] = useState<string>("text");
  const [valorColumna, setValorColumna] = useState<string>("");
  const [deleteRow, setDeleteRow] = useState<(string | number)[]>();

  const loadTable = async () => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let nombreUsuario = urlParams.get("nombreUsuario");

    const requestOptions = {
      method: "GET",
    };

    const response = await fetch(
      `http://localhost:8080/loadTable/${nombreUsuario}`,
      requestOptions
    );

    if (response.ok) {
      const result = await response.json();

      if (result.rows && result.columns) {
        setRows(result.rows);
        setColumns(result.columns);
        setNewRow(
          result.columns.map((column: { name: string; type: string }) => {
            if (column.type === "checkbox") {
              return "No";
            }
            return "";
          })
        );
      } else {
      }
    } else {
    }
  };

  useEffect(() => {
    loadTable();
  }, []);

  const addInformationTable = async () => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let nombreUsuario = urlParams.get("nombreUsuario");

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        username: nombreUsuario,
        rows: rows,
        columns: columns,
      }),
    };

    const response = await fetch(
      "http://localhost:8080/addInformationTable",
      requestOptions
    );

    if (response.ok) {
      const result = await response.json();
    } else {
    }
  };

  useEffect(() => {
    if (initialized) {
      addInformationTable();
    }
  }, [rows, initialized]);

  useEffect(() => {
    if (initialized) {
      addInformationTable();
    }
  }, [deleteRow, initialized]);

  return (
    <>
      <DivBotones>
        <BotonEnlaces
          onClick={() => {
            let queryString = window.location.search;
            let urlParams = new URLSearchParams(queryString);
            let nombreUsuario = urlParams.get("nombreUsuario");

            router.push(`./updateUser?nombreUsuario=${nombreUsuario}`);
          }}
        >
          Actualizar usuario
        </BotonEnlaces>

        <BotonEnlaces
          onClick={() => {
            router.push(`./loginUser`);
          }}
        >
          Cerrar sesion
        </BotonEnlaces>
      </DivBotones>

      <Titulo>Table</Titulo>

      <Menu>
        <Wrapper columns={columns.length}>
          {columns.map((column, index) => {
            return (
              <>
                <ColumnDiv>
                  <ColumnName
                    value={column.name}
                    onChange={(e) =>
                      setColumns(
                        columns.map((column, i) => {
                          if (i === index) {
                            return { name: e.target.value, type: column.type };
                          } else {
                            return column;
                          }
                        })
                      )
                    }
                  ></ColumnName>
                </ColumnDiv>
              </>
            );
          })}

          {rows.map((row, index) => {
            return (
              <>
                {row.map((item) => {
                  return (
                    <>
                      <GridItem row={index + 2}>{item}</GridItem>
                    </>
                  );
                })}

                <RemoveRowButton
                  row={index + 2}
                  column={columns.length + 1}
                  onClick={async () => {
                    const borrarFilaElegidaEliminada = rows.filter((row, i) => {
                      i != index;
                    });

                    const identificarFilaElegidaEliminada = rows.filter(
                      (row, i) => {
                        i === index;
                      }
                    );

                    identificarFilaElegidaEliminada.forEach((valores) => {
                      setDeleteRow(valores);
                    });

                    setRows(borrarFilaElegidaEliminada);

                    setInitialized(true);
                  }}
                >
                  <Image width={20} height={20} src="/trash.png" alt=""></Image>
                </RemoveRowButton>
              </>
            );
          })}
        </Wrapper>

        <h1>Columns.length: {columns.length + 1}</h1>

        <AddRowsDiv>
          <InputsDiv>
            {columns.map((column, index) => {
              return (
                <>
                  <input
                    placeholder={column.name}
                    type={columns[index].type}
                    onChange={(event) =>
                      setNewRow(
                        newRow.map((value, i) => {
                          if (i === index) {
                            return event.target.value;
                          } else {
                            return value;
                          }
                        })
                      )
                    }
                  ></input>
                </>
              );
            })}

            <button
              onClick={async () => {
                let ningunFallo: boolean = true;
                newRow.forEach((value) => {
                  if (typeof value === "number") {
                    if (value < 0) {
                      ningunFallo = false;
                    }
                  }

                  if (typeof value === "string") {
                    if (parseInt(value) < 0) {
                      ningunFallo = false;
                    }
                  }
                });

                if (ningunFallo) {
                  setRows([...rows, newRow]);
                  setInitialized(true);
                } else {
                  alert("Hay errores en la introduccion de datos");
                }
              }}
            >
              Añadir
            </button>
          </InputsDiv>
        </AddRowsDiv>

        <Titulo>Add columns</Titulo>

        <div>
          <input
            type="text"
            placeholder="Nombre tabla"
            onChange={(event) => setValorColumna(event.target.value)}
          ></input>
          <select
            value={valueSelect}
            onChange={(event) => {
              setValueSelect(event.target.value);
            }}
          >
            <option value="text">String</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="checkbox">Checkbox</option>
          </select>

          {columns.length < 10 && (
            <AddColumnButton
              row={1}
              column={columns.length + 1}
              onClick={() => {
                setColumns([
                  ...columns,
                  { name: valorColumna, type: valueSelect },
                ]);
                let updateRows = rows;
                updateRows.forEach((row) => {
                  if (row.length < columns.length + 1) {
                    row.push("");
                  }
                });

                setRows(updateRows);
                setNewRow([...newRow, ""]);
              }}
            >
              Add Column
            </AddColumnButton>
          )}
        </div>

        {columns.map((column) => {
          return (
            <>
              <p style={{ background: "red" }}>
                Column name: {column.name} and Column type: {column.type}
              </p>
            </>
          );
        })}

        <ParrafoPrueba>{"ROWS: " + rows}</ParrafoPrueba>
        <ParrafoPrueba>{"DELETE ROW: " + deleteRow}</ParrafoPrueba>
        <ParrafoPrueba>{"NEW ROW: " + newRow}</ParrafoPrueba>
      </Menu>
    </>
  );
};

export default TablaInformacionUsuario;

type RowProps = {
  row: number;
  column?: number;
};

type WrapProps = {
  columns: number;
};

const ParrafoPrueba = styled.p`
  background-color: blue;
  color: pink;
  font-size: 30px;
`;

const Titulo = styled.h1`
  background-color: blue;
  color: white;
  font-size: 26px;
  border-radius: 10%;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

const Wrapper = styled.div<WrapProps>`
  margin-left: 60px;
  margin-right: 60px;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
  grid-gap: 5px;
  grid-auto-rows: minmax(30px, auto);
  border: 5px solid black;
  padding: 10px;
`;

const GridItem = styled.p<RowProps>`
  grid-row: ${(props) => props.row};
  border: 1px solid blue;
  text-align: center;
  line-height: 30px;
  padding: 15px;
  margin: 0;
  font-size: 18px;
`;

const ColumnDiv = styled.div`
  display: flex;
  justify-content: center;
  border: 5px solid blue;
  padding: 20px;
  margin: 0;
`;

const ColumnName = styled.input`
  padding: 0px;
  text-align: center;
  margin: 0px;
  font-size: 20px;
  font-weight: 600;
  border: none;
`;

const AddRowsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 30px;
  text-align: center;
`;

const InputsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  gap: 10px;
`;

const RemoveRowButton = styled.button<RowProps>`
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.column};
  border: 2px solid red;
  background-image: "/trash.png";
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: red;
    color: white;
  }
`;

const AddColumnButton = styled.button<RowProps>`
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.column};
  border: 2px solid green;
  background-image: "/trash.png";
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: green;
    color: white;
  }
`;

const DivBotones = styled.div`
  display: flex;
  justify-content: space-between;
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
  font-size: 20px;
  margin: 20px;

  :hover {
    cursor: pointer;
  }
`;
