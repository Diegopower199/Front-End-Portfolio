import {
  AddColumnButton,
  AddRowsDiv,
  ColumnDiv,
  ColumnName,
  GridItem,
  InputsDiv,
  Menu,
  RemoveRowButton,
  Titulo,
  Wrapper,
} from "@/styles/myStyledComponents";
import Image from "next/image";
import { useState } from "react";

const Tabla = () => {
  const [rows, setRows] = useState<string[][]>([]);
  const [columns, setColumns] = useState<string[]>([
    "NOMBRE",
    "AGE",
    "BIRTH DATE",
  ]);
  const [typeColumn, setTypeColumn] = useState<string[]>([
    "text",
    "number",
    "date",
  ]);
  const [newRow, setNewRow] = useState<string[]>(["", "", ""]);
  const [valueSelect, setValueSelect] = useState("");
  const [valorColumna, setValorColumna] = useState<string>("");

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
                    onChange={(event) =>
                      setColumns(
                        columns.map((column, index) => {
                          if (index === index) {
                            return event.target.value;
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
                  onClick={() => {
                    setRows(
                      rows.filter((row, i) => {
                        return i != index;
                      })
                    );
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
              onClick={() => {
                let ningunFallo: boolean = true;
                newRow.forEach((value) => {
                  if (value.length === 0) {
                    ningunFallo = false;
                  }

                  if (typeof value === "number") {
                    if (parseInt(value) < 0) {
                      ningunFallo = false;
                    }
                  }

                  if (typeof value === "string") {
                    if (!/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(value)) {
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
                setTypeColumn([...typeColumn, valueSelect]);
                setNewRow([...newRow, ""]);
              }}
            >
              Add Column
            </AddColumnButton>
          )}
        </div>
      </Menu>
    </>
  );
};

export default Tabla;
