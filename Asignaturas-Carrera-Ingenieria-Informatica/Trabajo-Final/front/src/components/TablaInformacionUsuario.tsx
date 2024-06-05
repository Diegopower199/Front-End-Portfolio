import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TablaInformacionUsuario = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const nombreUsuario = urlParams.get("nombreUsuario");

  const [rows, setRows] = useState<(string | number)[][]>([]);
  const [columns, setColumns] = useState<string[]>([
    "Nombre",
    "Edad",
    "Fecha de nacimiento",
  ]);
  const [typeColumn, setTypeColumn] = useState<string[]>([
    "text",
    "number",
    "date",
  ]);
  const [newRow, setNewRow] = useState<(string | number)[]>(["", "", ""]);
  const [valueSelect, setValueSelect] = useState("");
  const [valorColumna, setValorColumna] = useState<string>("");
  const [deleteRow, setDeleteRow] = useState<(string | number)[]>();

  useEffect(() => {
    const fetchInformacionTabla = async () => {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        `http://localhost:8080/getInformacionTablaUser?nombreUsuario=${nombreUsuario}`,
        requestOptions
      );
      const data = await response.json();

      const prueba = data.informacionTabla;

      let filasTotales: string[][] = [];

      prueba.forEach(
        (item: {
          filas: string[];
          columnas: string[];
          nombreUsuario: string;
        }) => {
          filasTotales = [...filasTotales, item.filas];
        }
      );

      setRows(filasTotales);
    };
    fetchInformacionTabla();
  }, []);

  useEffect(() => {
    if (JSON.stringify(newRow) !== JSON.stringify(["", "", ""])) {
      const fetchAddRow = async () => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filas: newRow,
            columnas: columns,
            nombreUsuario: nombreUsuario,
          }),
        };

        const response = await fetch(
          "http://localhost:8080/addInformacion",
          requestOptions
        );

        await response.json();
      };
      fetchAddRow();
    }
  }, [rows]);

  useEffect(() => {
    if (deleteRow !== undefined) {
      const fetchDeleteRow = async () => {
        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filas: deleteRow,
            nombreUsuario: nombreUsuario,
          }),
        };

        const response = await fetch(
          "http://localhost:8080/deleteInformacionTabla",
          requestOptions
        );

        await response.json();
      };
      fetchDeleteRow();
    }
  }, [deleteRow]);

  return (
    <>
      <Titulo>Table</Titulo>

      <Menu>
        <Wrapper columns={columns.length}>
          {columns.map((column, index) => {
            return (
              <>
                <ColumnDiv>
                  <ColumnName
                    defaultValue={column}
                    onChange={(e) =>
                      setColumns(
                        columns.map((column, i) => {
                          if (i === index) {
                            return e.target.value;
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
                      return i != index;
                    });

                    const identificarFilaElegidaEliminada = rows.filter(
                      (row, i) => {
                        return i === index;
                      }
                    );

                    identificarFilaElegidaEliminada.forEach((valores) => {
                      setDeleteRow(valores);
                    });

                    setRows(borrarFilaElegidaEliminada);
                  }}
                >
                  <Image width={20} height={20} src="/trash.png" alt=""></Image>
                </RemoveRowButton>
              </>
            );
          })}
        </Wrapper>

        <AddRowsDiv>
          <InputsDiv>
            {columns.map((column, index) => {
              return (
                <>
                  <input
                    placeholder={column}
                    type={typeColumn[index]}
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
            onBlur={(event) => setValorColumna(event.target.value)}
          ></input>
          <select
            value={valueSelect}
            onChange={(event) => {
              setValueSelect(event.target.value);
            }}
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="Date">Date</option>
            <option value="checkbox">Checkbox</option>
          </select>

          {columns.length < 10 && (
            <AddColumnButton
              row={1}
              column={columns.length + 1}
              onClick={() => {
                setColumns([...columns, valorColumna]);
                valueSelect;
                setTypeColumn([...typeColumn, valueSelect]);
                setNewRow([...newRow, ""]);
              }}
            >
              Add Column
            </AddColumnButton>
          )}
        </div>
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

export const ParrafoPrueba = styled.p`
  background-color: blue;
  color: pink;
  font-size: 30px;
`;

export const Titulo = styled.h1`
  background-color: blue;
  color: white;
  font-size: 26px;
  border-radius: 10%;
`;

export const BotonAddColumn = styled.button`
  background-color: blue;
  color: white;
  border: 20%;
  border: 0px;
  padding: 0px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

export const Wrapper = styled.div<WrapProps>`
  margin-left: 60px;
  margin-right: 60px;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
  grid-gap: 5px;
  grid-auto-rows: minmax(30px, auto);
  border: 5px solid black;
  padding: 10px;
`;

export const GridItem = styled.p<RowProps>`
  grid-row: ${(props) => props.row};
  border: 1px solid blue;
  text-align: center;
  line-height: 30px;
  padding: 15px;
  margin: 0;
  font-size: 18px;
`;

export const ColumnDiv = styled.div`
  display: flex;
  justify-content: center;
  border: 5px solid blue;
  padding: 20px;
  margin: 0;
`;

export const ColumnName = styled.input`
  padding: 0px;
  text-align: center;
  margin: 0px;
  font-size: 20px;
  font-weight: 600;
  border: none;
`;

export const AddRowsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 30px;
  text-align: center;
`;

export const InputsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  gap: 10px;
`;

export const RemoveRowButton = styled.button<RowProps>`
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

export const AddColumnButton = styled.button<RowProps>`
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

export const RemoveColumnButton = styled.button`
  border: 2px solid red;
  background-image: "/trash.png";
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  font-weight: 600;
  &:hover {
    background: red;
    color: white;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
`;
