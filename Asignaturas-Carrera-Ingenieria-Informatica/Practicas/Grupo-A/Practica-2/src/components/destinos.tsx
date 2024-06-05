export type Destino = {
  id: number;
  nombre: String;
  descripcionCorta: String;
  descripcionLarga: String;
  imagenCorta: String;
  imagenLarga: String;
};

export type Detalle_Destino = {
  destino: Destino;
};

export const Detalles = (props: Detalle_Destino) => {
  return (
    <>
      <div className={"destino"}>
        <img className={"imagenCorta"} src={props.destino.imagenCorta}></img>
        <div className={"contenido"}>
          <div className={"nombre"}>{props.destino.nombre}</div>
          <div className={"descripcionCorta"}>
            {props.destino.descripcionCorta}
          </div>
        </div>
      </div>
    </>
  );
};
