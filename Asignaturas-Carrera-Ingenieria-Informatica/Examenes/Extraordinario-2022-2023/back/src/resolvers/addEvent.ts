import express from "express";
import client from "../db.ts";
import { DB_NAME } from "../env.ts";
import { Event, EventSchema } from "../types.ts";

const addEvent = async (req: express.Request, res: express.Response) => {
  try {
    const event: Event = req.body;

    if (
      !event.title ||
      !event.date ||
      !event.init ||
      !event.end ||
      !event.participants ||
      !Array.isArray(event.participants)
    ) {
      res.status(400).json({ message: "Invalid event" });
      return;
    }

    const date = new Date(event.date);

    if (isNaN(date.getTime())) {
      res.status(400).json({ message: "Invalid date" });
      return;
    }

    if (event.init >= event.end || event.init < 0 || event.end > 24) {
      res.status(400).json({ message: "Invalid init and end" });
      return;
    }

    await client.connect();

    const db = client.db(DB_NAME);
    const EventsCollection = db.collection<EventSchema>("events");

    const events = await EventsCollection.find({
      date: {
        $eq: new Date(date.setHours(0, 0, 0, 0)),
      },
      $or: [
        {
          init: {
            $gt: event.init,
            $lt: event.end,
          },
        },
        {
          end: {
            $gt: event.init,
            $lt: event.end,
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

    const insertEvent = await db.collection("events").insertOne({
      ...event,
      date: new Date(new Date(event.date).setHours(0, 0, 0, 0)),
    });

    if (insertEvent.acknowledged) {
      res.status(200).json({ ...event, id: insertEvent.insertedId.toString() });
    } else {
      res.status(500).json({ message: "Error inserting event" });
    }

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default addEvent;
