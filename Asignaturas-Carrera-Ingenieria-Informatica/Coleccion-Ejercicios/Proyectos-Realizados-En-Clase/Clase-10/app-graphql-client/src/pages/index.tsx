import Link from "next/link";

export default function Home(props: { name: string }) {
  return (
    <>
      <Link href="/page/1">A la pag 1</Link>
    </>
  );
}
