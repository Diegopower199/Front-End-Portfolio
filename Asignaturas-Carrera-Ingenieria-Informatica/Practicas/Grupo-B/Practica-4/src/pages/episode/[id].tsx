import CharacterEpisode from "@/components/CharacterEpisode";
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
};

const IdCharacter: NextPage<{ id: string }> = ({ id }) => {
  return (
    <>
      <CharacterEpisode id={id} />
    </>
  );
};

export default IdCharacter;
