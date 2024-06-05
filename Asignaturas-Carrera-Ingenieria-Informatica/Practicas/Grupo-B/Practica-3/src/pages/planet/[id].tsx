import { Planet, PlanetAPI } from "@/type";
import Link from "next/link";
import { useEffect, useState } from "react";

const Planeta = () => {
  const [data, setDataPlanet] = useState<Planet | undefined>();
  const [id, setId] = useState<number>(0);

  const fetchData = async () => {
    try {
      const chars = await fetch(`https://swapi.dev/api/planets/${id}`);
      const dataAPI: PlanetAPI = await chars.json();

      const data: Planet = {
        ...dataAPI,
        residents: await Promise.all(
          dataAPI.residents.map(async (r: string) => {
            const data = await fetch(r);
            return await data.json();
          })
        ),

        films: await Promise.all(
          dataAPI.films.map(async (f: string) => {
            const data = await fetch(f);
            return await data.json();
          })
        ),
      };

      setDataPlanet(data);
    } catch (e) {}
  };

  useEffect(() => {
    const URLactual = window.location;
    setId(parseInt(URLactual.href.split("/").slice(-1)[0]));

    fetchData();
  });

  return (
    <>
      <div>
        <Link href="/planets/1">Back</Link>
        <h1>{data?.name}</h1>
        <p>Rotation period: {data?.rotation_period}</p>
        <p>Orbital period: {data?.orbital_period}</p>
        <p>Diameter: {data?.diameter}</p>
        <p>Climate: {data?.climate}</p>
        <p>Gravity: {data?.gravity}</p>
        <p>Terrain: {data?.terrain}</p>
        <p>Surface water: {data?.surface_water}</p>
        <p>Population: {data?.population}</p>
        <h2>Residents</h2>
        <ul>
          {data?.residents.map((resident) => {
            return <li key={resident.name}>{resident.name}</li>;
          })}
        </ul>
        <h2>Films</h2>
        <ul>
          {data?.films.map((film) => {
            return <li key={film.title}>{film.title}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Planeta;
