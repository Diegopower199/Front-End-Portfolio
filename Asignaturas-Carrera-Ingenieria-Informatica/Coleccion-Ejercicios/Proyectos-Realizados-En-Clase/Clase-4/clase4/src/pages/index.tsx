import Link from "next/link";

export default function Home() {
  const name = "Alberto";
  return (
    <>
      <Link href="/persona"> Mis personas </Link>
      <hr />
      Hola {name}.<br />
      Tu nombre tiene {name.length} letras.
      <br />
    </>
  );
}
