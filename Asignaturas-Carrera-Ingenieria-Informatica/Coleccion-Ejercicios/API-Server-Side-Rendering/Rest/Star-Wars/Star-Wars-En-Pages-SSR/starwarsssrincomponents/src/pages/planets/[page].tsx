import Link from "next/link";

type Planet = {
  name: string;
  url: string;
};

type PageProps = {
  next: string | null;
  previous: string | null;
  planets: Planet[];
};

type ServerSideProps = {
  params: {
    page: string;
  };
};

export const getServerSideProps = async (props: ServerSideProps) => {
  const { page } = props.params;

  let planets: Planet[] = [];

  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  const data = await res.json();

  data.results = data.results.map((planet: Planet) => {
    let id = planet.url.split("/")[5];
    planets.push({ name: planet.name, url: `/planets/${id}` });

    return planet;
  });

  return {
    props: {
      next: data.next,
      previous: data.previous,
      planets: data.results,
    },
  };
};

const PlanetList = (props: PageProps) => {
  if (props.planets.length === 0) {
    return <h1>No planets found</h1>;
  }

  return (
    <div>
      <h1>Planets</h1>

      <div>
        {props.previous && (
          <a href={`/planets/${props.previous.split("=")[1]}`}>Previous</a>
        )}
        {props.next && (
          <a href={`/planets/${props.next.split("=")[1]}`}>Next</a>
        )}
      </div>

      <ul>
        {props.planets.map((planet: Planet) => {
          return (
            <li key={planet.name}>
              <Link href={`/planet/${planet.url.split("/")[5]}`}>
                {planet.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlanetList;
