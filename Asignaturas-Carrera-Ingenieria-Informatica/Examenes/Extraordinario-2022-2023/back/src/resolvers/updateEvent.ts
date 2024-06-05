import express from "express";
import { ObjectId } from "mongodb";
import client from "../db.ts";
import { DB_NAME } from "../env.ts";
import { Event, EventSchema } from "../types.ts";

const updateEvent = async (req: express.Request, res: express.Response) => {
  try {
    const event: Event = req.body;

    if (
      !event.id ||
      !event.title ||
      !event.date ||
      !event.init ||
      !event.end ||
      !event.participants ||
      !Array.isArray(event.participants) ||
      !(typeof event.title === "string") ||
      !(typeof event.date === "string") ||
      !(typeof event.init === "number") ||
      !(typeof event.end === "number")
    ) {
      res.status(400).json({ message: "Invalid event data" });
      return;
    }

    const date = new Date(event.date);

    if (isNaN(date.getTime())) {
      res.status(400).json({ message: "Invalid date" });
      return;
    }

    await client.connect();

    const db = client.db(DB_NAME);

    const EventsCollection = db.collection<EventSchema>("events");

    const events = await EventsCollection.find({
      date: {
        $eq: date,
      },
      _id: {
        $ne: new ObjectId(event.id),
      },
      $or: [
        {
          init: {
            $gte: event.init,
            $lte: event.end,
          },
        },
        {
          end: {
            $gte: event.init,
            $lte: event.end,
          },
        },
        {
          $and: [
            {
              init: {
                $lte: event.init,
              },
            },
            {
              end: {
                $gte: event.end,
              },
            },
          ],
        },
      ],
    }).toArray();

    if (events.length > 0) {
      res.status(400).json({ message: "Event that overlaps already exists" });
      client.close();
      return;
    }

    const updatedEvent = await EventsCollection.updateOne(
      { _id: new ObjectId(event.id) },
      event
    );

    if (updatedEvent.modifiedCount === 0) {
      res.status(404).json({ message: "Event not found" });
      client.close();
      return;
    }

    res.status(200).json(event);

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default updateEvent;
