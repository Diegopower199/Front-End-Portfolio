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

const Planet: React.FC<{ id: string }> = ({ id }) => {
  const [planet, setPlanet] = useState<Planets | undefined>(undefined);

  const fetchPlanet = async () => {
    const res = await fetch(`https://swapi.dev/api/planets/${id}`);
    const data = await res.json();

    data.residents = await Promise.all(
      data.residents.map(async (url: string) => {
        const res = await fetch(url);
        const json = await res.json();

        return json.name;
      })
    );

    data.films = await Promise.all(
      data.films.map(async (url: string) => {
        const res = await fetch(url);
        const json = await res.json();
        
        return json.title;
      })
    );

    setPlanet(data);
  };

  useEffect(() => {
    fetchPlanet();
  }, []);

  return (
    <div>
      <div>
        <h2>{planet?.name}</h2>
        <p>Climate: {planet?.climate}</p>
        <p>Terrain: {planet?.terrain}</p>
        <p>Population: {planet?.population}</p>
        <p>Gravity: {planet?.gravity}</p>
        <p>Diameter: {planet?.diameter}</p>
        <p>Rotation Period: {planet?.rotation_period}</p>
        <p>Orbital Period: {planet?.orbital_period}</p>
        <p>Surface Water: {planet?.surface_water}</p>
        <p>Residents: {planet?.residents.join(", ")}</p>
        <p>Films: {planet?.films.join(", ")}</p>
      </div>
    </div>
  );
};

export default Planet;
