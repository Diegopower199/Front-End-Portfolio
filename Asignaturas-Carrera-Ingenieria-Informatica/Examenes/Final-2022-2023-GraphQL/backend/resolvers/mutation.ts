import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";
import { EventsCollection } from "../db.ts";

export const Mutation = {
  createEvent: async (
    _: any,
    args: {
      title: string;
      description: string;
      date: Date;
      startHour: number;
      endHour: number;
    }
  ) => {
    const { title, description, date, startHour, endHour } = args;

    const event = await EventsCollection.findOne({
      date: new Date(date),
      $or: [
        { startHour: { $gte: startHour, $lte: endHour } },
        { endHour: { $gte: startHour, $lte: endHour } },
      ],
    });

    if (event) {
      throw new Error("There is already an event in that date and time");
    }

    const id = await EventsCollection.insertOne({
      title,
      description,
      date: new Date(date),
      startHour,
      endHour,
    });

    return {
      id: id.toString(),
      title,
      description,
      date: new Date(date),
      startHour,
      endHour,
    };
  },

  updateEvent: async (
    _: any,
    args: {
      id: string;
      title: string;
      description: string;
      date: Date;
      startHour: number;
      endHour: number;
    }
  ) => {
    const { id, title, description, date, startHour, endHour } = args;

    const event = await EventsCollection.findOne({ _id: new ObjectId(id) });

    if (!event) {
      throw new Error("Event not found");
    }

    const eventInSameDate = await EventsCollection.findOne({
      date: new Date(date),
      $or: [
        { startHour: { $gte: startHour, $lte: endHour } },
        { endHour: { $gte: startHour, $lte: endHour } },
      ],
    });

    if (eventInSameDate && eventInSameDate._id.toString() !== id) {
      throw new Error("There is already an event in that date and time");
    }

    await EventsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          description,
          date: new Date(date),
          startHour,
          endHour,
        },
      }
    );

    return {
      id,
      title,
      description,
      date: new Date(date),
      startHour,
      endHour,
    };
  },

  deleteEvent: async (_: any, args: { id: string }) => {
    const event = await EventsCollection.findOne({
      _id: new ObjectId(args.id),
    });

    if (!event) {
      throw new Error("Event not found");
    }

    await EventsCollection.deleteOne({ _id: new ObjectId(args.id) });

    return {
      id: args.id,
      title: event.title,
      description: event.description,
      date: event.date,
      startHour: event.startHour,
      endHour: event.endHour,
    };
  },
};
