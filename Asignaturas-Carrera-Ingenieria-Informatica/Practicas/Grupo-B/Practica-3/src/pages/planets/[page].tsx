import PlanetsList from "@/components/PlanetList";
import { PlanetsAPI } from "@/type";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props: Array<{
    name: string;
    id: string;
    page: number;
  }> = [];
  try {
    const page = context.query.page;

    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    const data: PlanetsAPI = await res.json();

    props.push(
      ...data.results.map((planet) => {
        const name = planet.name;

        const id = planet.url.split("/").slice(-2)[0];

        let page = 0;

        if (parseInt(planet.url.split("/").slice(-2)[0]) % 10 == 0) {
          page = Math.trunc(parseInt(planet.url.split("/").slice(-2)[0]) / 10);
        } else {
          page =
            Math.trunc(parseInt(planet.url.split("/").slice(-2)[0]) / 10) + 1;
        }

        return { name, id, page };
      })
    );
  } catch (error) {}

  return {
    props: {
      data: props,
    },
  };
};

type HomeProps = {
  data: Array<{
    name: string;
    id: string;
    page: number;
  }>;
};

export default function Page(props: HomeProps) {
  return <PlanetsList data={props.data} />;
}
