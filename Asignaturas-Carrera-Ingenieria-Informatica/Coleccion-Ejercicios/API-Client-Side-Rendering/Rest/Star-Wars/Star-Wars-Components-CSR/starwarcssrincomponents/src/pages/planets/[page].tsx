import PlanetList from "@/components/planetList";
import { GetServerSideProps } from "next";

type ServerSideProps = {
  page: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page;

  return {
    props: {
      page,
    },
  };
};

const Planets = (props: ServerSideProps) => {
  return (
    <div>
      <PlanetList page={props.page} />
    </div>
  );
};

export default Planets;
