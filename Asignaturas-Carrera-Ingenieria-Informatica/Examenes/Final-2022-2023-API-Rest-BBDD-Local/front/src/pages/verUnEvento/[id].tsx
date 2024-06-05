import { GetServerSideProps, NextPage } from "next";

type Evento = {
  _id: string;
  titulo: string;
  descripcion: string;
  fecha: Date;
  inicio: number;
  fin: number;
  invitados: string[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const data = await fetch(`http://back:8080/event/${id}`);

  const evento = await data.json();

  return {
    props: {
      evento,
    },
  };
};

const Page: NextPage<{ evento: Evento }> = (props: { evento: Evento }) => {
  return (
    <>
      Titulo: {props.evento.titulo}
      <br />
      Descripcion: {props.evento.descripcion}
      <br />
      Hora inicio: {props.evento.inicio}
      <br />
      Hora final: {props.evento.fin}
      <br />
      Fecha: {props.evento.fecha}
      <br />
      Invitados: {props.evento.invitados}
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Page;
