import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

type PlanetProps = {
  planet: {
    name: string;
    url: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
    created: string;
    edited: string;
  };
};

interface Params extends ParsedUrlQuery {
  page: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://swapi.dev/api/planets/");
  const data = await res.json();

  let paths = [];

  const planets = data.count;

  for (let i = 1; i <= planets; i++) {
    paths.push({
      params: { id: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params;

  const res = await fetch(`https://swapi.dev/api/planets/${id}`);
  const data = await res.json();

  data.residents = await Promise.all(
    data.residents.map(async (resident: string) => {
      const res = await fetch(resident);
      const data = await res.json();

      return data;
    })
  );

  data.films = await Promise.all(
    data.films.map(async (film: string) => {
      const res = await fetch(film);
      const data = await res.json();

      return data;
    })
  );

  return {
    props: {
      planet: data,
    },
  };
};

const Planet = (props: PlanetProps) => {
  return (
    <div>
      <h1>Planet</h1>
      <div>
        <h3>Name: {props.planet.name}</h3>
        <h3>Rotation Period: {props.planet.rotation_period}</h3>
        <h3>Orbital Period: {props.planet.orbital_period}</h3>
        <h3>Diameter: {props.planet.diameter}</h3>
        <h3>Climate: {props.planet.climate}</h3>
        <h3>Gravity: {props.planet.gravity}</h3>
        <h3>Terrain: {props.planet.terrain}</h3>
        <h3>Surface Water: {props.planet.surface_water}</h3>
        <h3>Population: {props.planet.population}</h3>
        <h3>
          Residents:{" "}
          {props.planet.residents.map((resident: any) => {
            return <li>{resident.name}</li>;
          })}
        </h3>
        <h3>
          Films:{" "}
          {props.planet.films.map((film: any) => {
            return <li>{film.title}</li>;
          })}
        </h3>
      </div>
    </div>
  );
};

export default Planet;
