import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

type Planet = {
  name: string;
  url: string;
};

type PageProps = {
  next: string | null;
  previous: string | null;
  results: Planet[];
};

interface Params extends ParsedUrlQuery {
  page: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://swapi.dev/api/planets/");
  const data = await res.json();

  let paths = [];

  const pages = data.count / 10;

  for (let i = 1; i <= pages; i++) {
    paths.push({
      params: { page: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { page } = context.params as Params;

  const planets: Planet[] = [];

  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  const data = await res.json();

  data.results = data.results.map((result: Planet) => {
    const urlParts = result.url.split("/")[5];

    planets.push({
      name: result.name,
      url: urlParts,
    });

    return planets;
  });

  return {
    props: {
      results: planets,
      next: data.next,
      previous: data.previous,
    },
  };
};

const PlanetList = (props: PageProps) => {
  return (
    <div>
      <h1>Planets</h1>

      <div>
        <a href={`/planets/${props.previous?.split("=")[1]}`}>Previous</a>
        <a href={`/planets/${props.next?.split("=")[1]}`}>Next</a>
      </div>

      <div>
        {props.results.map((planet: Planet) => {
          return (
            <div key={planet.name}>
              <Link href={`/planet/${planet.url}`}>{planet.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanetList;
