import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { ObjectId } from "mongo";
import { eventosCollection, EventosSchema } from "../db.ts";
import { Eventos } from "../types.ts";

type UpdateEventContext = RouterContext<
  "/updateEvent",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const updateEvent = async (context: UpdateEventContext) => {
  try {
    const result = context.request.body({ type: "json" });
    const value = await result.value;

    if (!value.id) {
      context.response.status = 400;
      context.response.body = "Falta el id para identificar el evento";
      return;
    }

    if (
      !value.titulo &&
      !value.descripcion &&
      !value.inicio &&
      !value.fin &&
      !value.invitados
    ) {
      context.response.status = 400;
      context.response.body =
        "Debes introducir almenos un campo para modificar";
      return;
    }

    if (value.fecha) {
      const split = value.fecha.split("-");

      if (split[1] > 12 || split[1] < 1) {
        context.response.status = 400;
        context.response.body = "Mes introducido no existente";
        return;
      }

      if (split[2] > 31 || split[2] < 1) {
        context.response.status = 400;
        context.response.body = "Dia introducido no existente";
        return;
      }

      if (split[1] === "02") {
        if (split[2] > 28) {
          context.response.status = 400;
          context.response.body =
            "Dia introducido no existente en el mes de febrero";
          return;
        }
      }
    }

    const evento: EventosSchema | undefined = await eventosCollection.findOne({
      _id: new ObjectId(value.id),
    });

    if (!evento) {
      context.response.status = 404;
      context.response.body = "No existe el evento";
      return;
    }

    if (value.fin) {
      if (evento.inicio >= value.fin) {
        context.response.status = 400;
        context.response.body =
          "La hora de inicio no puede ser mayor o igual a la hora final";
        return;
      }
    } else if (value.inicio) {
      if (value.inicio >= evento.fin) {
        context.response.status = 400;
        context.response.body =
          "La hora de inicio no puede ser mayor o igual a la hora final";
        return;
      }
    } else if (value.inicio >= value.fin) {
      context.response.status = 400;
      context.response.body =
        "La hora de inicio no puede ser mayor o igual a la hora final";
      return;
    }

    const comprobarEvento: EventosSchema[] = await eventosCollection
      .find({ fecha: new Date(value.fecha) })
      .toArray();

    if (comprobarEvento.length > 0) {
      for (let i = 0; i < comprobarEvento.length; i++) {
        if (
          comprobarEvento[i].inicio <= value.inicio &&
          comprobarEvento[i].fin >= value.inicio
        ) {
          context.response.status = 400;
          context.response.body = "Ya hay un evento en esa hora";
          return;
        }
        if (
          comprobarEvento[i].inicio <= value.fin &&
          comprobarEvento[i].fin >= value.fin
        ) {
          context.response.status = 400;
          context.response.body = "Ya hay un evento en esa hora";
          return;
        }
      }
    }

    const newEvent: Partial<Eventos> = {
      titulo: value.titulo ? value.titulo : evento.titulo,
      descripcion: value.descripcion ? value.descripcion : evento.descripcion,
      fecha: value.fecha ? new Date(value.fecha) : evento.fecha,
      inicio: value.inicio ? value.inicio : evento.inicio,
      fin: value.fin ? value.fin : evento.fin,
      invitados: value.invitados ? value.invitados : evento.invitados,
    };

    await eventosCollection.updateOne(
      { _id: new ObjectId(value.id) },
      { $set: newEvent as Eventos }
    );

    const mostrarEvento: EventosSchema = await eventosCollection.findOne({
      _id: new ObjectId(value.id),
    });

    context.response.status = 200;
    context.response.body = mostrarEvento;
  } catch (error) {
    context.response.status = 500;
  }
};
