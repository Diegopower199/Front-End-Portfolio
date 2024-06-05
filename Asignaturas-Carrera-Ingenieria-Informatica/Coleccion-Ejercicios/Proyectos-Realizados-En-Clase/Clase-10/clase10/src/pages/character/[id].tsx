import Character from "@/components/Character";
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
};

const Page: NextPage<{ id: string }> = ({ id }) => {
  return (
    <>
      <Character id={id} />
    </>
  );
};

export default Page;
