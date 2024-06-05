import { gql, useQuery } from "@apollo/client";
import { FC, useEffect, useState } from "react";

const Character: FC<{ id: string }> = ({ id }) => {
  const query = gql`
    query character($id: ID!) {
      character(id: $id) {
        name
      }
    }
  `;

  const [charID, setCharID] = useState<string>(id);

  const { loading, error, data, refetch } = useQuery<{
    character: {
      name: string;
    };
  }>(query, {
    variables: {
      id: charID,
    },
  });

  useEffect(() => {
    refetch({
      variables: {
        id: charID,
      },
    });
  }, [charID]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Upps. La vida es dura</div>;
  }

  return (
    <>
      {data!.character.name}
      <input
        type={"text"}
        onChange={(event) => setCharID(event.target.value)}
      />
      {charID}
    </>
  );
};

export default Character;
