import Link from "next/link";
import React, { useEffect, useState } from "react";

type Planets = {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  gravity: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
};

type Info = {
  count: number;
  next?: string;
  previous?: string;
  results: Planets[];
};

const PlanetList: React.FC<{ page: string }> = ({ page }) => {
  const [planets, setPlanets] = useState<Info | undefined>(undefined);

  useEffect(() => {
    const fetchPlanets = async () => {
      const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
      const data = await res.json();

      setPlanets(data);
    };
    fetchPlanets();
  }, [page]);

  if (!planets) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h2>Planets (page: {page})</h2>
      <ul>
        {planets.results.map((planet, index) => {
          return (
            <li key={index}>
              <Link href={`/planet/${planet.url.split("/")[5]}`}>
                {planet.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <div>
        <a href={`/planets/${Number(page) - 1}`}>Previous</a>
        <a href={`/planets/${Number(page) + 1}`}>Next</a>
      </div>
    </div>
  );
};

export default PlanetList;
