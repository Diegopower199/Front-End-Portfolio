import Image from "next/image";
import Link from "next/link";

type ServerSideProps = {
  params: {
    id: string;
  };
};

export async function getServerSideProps(props: ServerSideProps) {
  const id = props.params.id;

  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const json = await res.json();

  return { props: json };
}

type CharacterProps = {
  name: string;
  image: string;
};

const Character = (props: CharacterProps) => {
  return (
    <>
      <Link href={"/"}>Ir a la lista</Link>
      <Image src={props.image} alt={props.name} width={100} height={100} />
      {props.name}
    </>
  );
};

export default Character;
