import Planet from "@/components/planet";
import { GetServerSideProps } from "next";

type ServerSideProps = {
  id: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  
  return {
    props: {
      id,
    },
  };
};

const InvPlanet = (props: ServerSideProps) => {
  return (
    <div>
      <h1>Planet</h1>
      <Planet id={props.id} />
    </div>
  );
};

export default InvPlanet;
