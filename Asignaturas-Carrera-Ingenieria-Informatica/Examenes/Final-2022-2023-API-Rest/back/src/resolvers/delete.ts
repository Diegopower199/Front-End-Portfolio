import { ObjectId } from "mongo";
import { RouterContext } from "router";
import { eventosCollections } from "../db/mongo.ts";

type DeleteEventContext = RouterContext<
  "/deleteEvent/:id",
  {
    id: string;
  }
>;

export const deleteEvent = async (context: DeleteEventContext) => {
  try {
    if (!context.params?.id) {
      context.response.body = {
        message: "Falta el id por poner en url",
      };
      context.response.status = 400;
      return;
    }

    const id = context.params.id;

    const evento = await eventosCollections.findOne({ _id: new ObjectId(id) });

    if (!evento) {
      context.response.body = {
        message: "NO existe un evento con ese id",
      };
      context.response.status = 404;
      return;
    }

    await eventosCollections.deleteOne({ _id: new ObjectId(id) });

    context.response.body = {
      message: "Evento eliminado",
    };
    context.response.status = 200;
    return;
  } catch (error) {
    context.response.body = {
      message: "Ha ocurrido algun error",
      error: error,
    };
    context.response.status = 400;
    return;
  }
};
