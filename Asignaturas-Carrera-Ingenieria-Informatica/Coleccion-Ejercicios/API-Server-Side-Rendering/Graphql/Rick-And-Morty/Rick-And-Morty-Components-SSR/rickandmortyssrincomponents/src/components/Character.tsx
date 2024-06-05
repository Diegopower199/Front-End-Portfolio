const CharacterComponent = ({
  results,
}: {
  results: {
    id: string;
    name: string;
    image: string;
    status: string;
    type: string;
    gender: string;
  };
}) => {
  <div>
    <p>{results.id}</p>
    <p>{results.name}</p>
    <p>{results.image}</p>
    <p>{results.gender}</p>
    <p>{results.status}</p>
    <p>{results.type}</p>
  </div>;
};

export default CharacterComponent;
