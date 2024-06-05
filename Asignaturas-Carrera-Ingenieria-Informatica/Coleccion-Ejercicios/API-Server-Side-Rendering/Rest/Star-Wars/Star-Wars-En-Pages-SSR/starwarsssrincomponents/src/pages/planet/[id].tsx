import { GetServerSideProps } from "next";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const res = await fetch(`https://swapi.dev/api/planets/${id}`);
  const data = await res.json();

  data.residents = await Promise.all(
    data.residents.map(async (resident: string) => {
      const res = await fetch(resident);
      const data = await res.json();

      return data.name;
    })
  );

  data.films = await Promise.all(
    data.films.map(async (film: string) => {
      const res = await fetch(film);
      const data = await res.json();

      return data.title;
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

        <h3>Residents:</h3>
        <ul>
          {props.planet.residents.map((resident: string) => {
            return <li>{resident}</li>;
          })}
        </ul>

        <h3>Films:</h3>
        <ul>
          {props.planet.films.map((film: string) => {
            return <li>{film}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Planet;
