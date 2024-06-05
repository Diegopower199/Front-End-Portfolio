import { gql, useQuery } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page } = context.query;

  return {
    props: {
      page,
    },
  };
};

const LocationsPaginados: NextPage<{ page: number }> = (props: {
  page: number;
}) => {
  const query = gql`
    query locations($page: Int!) {
      locations(page: $page) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          type
          dimension
          residents {
            id
          }
          created
        }
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery<{
    locations: {
      info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
      };
      results: {
        id: string;
        name: string;
        type: string;
        dimension: string;
        residents: { id: string }[];
        created: string;
      }[];
    };
  }>(query, {
    variables: {
      page: Number(props.page),
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Upps. La vida es dura</div>;
  }

  return (
    <>
      <Link href={"/"}>Menu principal</Link>
      <TituloH1>LOCATIONS RICK Y MORTY</TituloH1>

      <DivLocations>
        {data?.locations.results.map((location) => {
          return (
            <DivLocationUnicoLink>
              <Link
                key={location.id}
                href={`/location/[id]`}
                as={`/location/${location.id}`}
              >
                <DivLocationUnico>
                  <TituloLocation>Name: {location.name} </TituloLocation>
                  <TituloLocation>
                    {" "}
                    Dimension: {location.dimension}{" "}
                  </TituloLocation>
                  <TituloLocation>
                    {" "}
                    Air Date: {location.created}{" "}
                  </TituloLocation>
                </DivLocationUnico>
              </Link>
            </DivLocationUnicoLink>
          );
        })}
      </DivLocations>

      <DivBusqueda>
        <ParrafoNombre> Nombre location: </ParrafoNombre>{" "}
        <input type="text" placeholder="Nombre a buscar"></input>
        <BotonClick
          botonPaginaValida={true}
          onClick={() => {
            alert("NO ESTA HECHO");
          }}
        >
          {" "}
          Buscar
        </BotonClick>
      </DivBusqueda>

      <BotonPaginas>
        <BotonClick
          botonPaginaValida={data?.locations.info.prev !== null}
          onClick={() => {
            location.replace(`/locations/${Number(props.page) - 1}`);
          }}
        >
          Anterior Pagina
        </BotonClick>

        <BotonClick
          botonPaginaValida={data?.locations.info.next !== null}
          onClick={() => {
            location.replace(`/locations/${Number(props.page) + 1}`);
          }}
        >
          Siguiente Pagina
        </BotonClick>
      </BotonPaginas>
    </>
  );
};

export default LocationsPaginados;

const TituloH1 = styled.h1`
  display: flex;
  justify-content: center;
`;

const DivLocations = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;

  justify-items: center;

  font-family: "Courier New", Courier, monospace;
  color: rgb(176, 176, 176);
  background-color: rgb(126, 21, 21);
`;

const DivLocationUnicoLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 300px;
  width: 300px;
  margin: 50px;
  text-decoration: none;

  :hover {
    background-color: #cc94547d;
  }

  :active :visited {
    text-decoration: none;
  }
`;

const DivLocationUnico = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 0px;
  margin: 0px;

  border: 2px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 300px;
  height: 300px;
  text-decoration: none;
`;

const TituloLocation = styled.p`
  font: bold 100% monospace;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: white;
  font-size: 20px;
  text-decoration: none;
`;

const DivBusqueda = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ParrafoNombre = styled.p`
  font: bold 100% monospace;
  text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: black;
  font-size: 20px;
`;

type InputProps = {
  botonPaginaValida: boolean;
};

const BotonClick = styled.button<InputProps>`
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  margin: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: ${(props) => (props.botonPaginaValida ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  outline: none;
  border-radius: 5px;
  border: 2px solid #212529;
  background: #212529;
  :active {
    background-color: red;
  }
`;

const BotonPaginas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
`;
