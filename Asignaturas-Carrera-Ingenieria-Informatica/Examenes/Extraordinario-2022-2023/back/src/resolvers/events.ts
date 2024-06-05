import express from "express";
import client from "../db.ts";
import { DB_NAME } from "../env.ts";
import { EventSchema } from "../types.ts";

const events = async (req: express.Request, res: express.Response) => {
  try {
    const { date } = req.query;

    if (!date) {
      res.status(400).json({ message: "Date is required" });
      return;
    }

    if (isNaN(Date.parse(date))) {
      res.status(400).json({ message: "Date is not valid" });
      return;
    }

    await client.connect();

    const db = client.db(DB_NAME);

    const events: EventSchema[] = await db
      .collection<EventSchema>("events")
      .find({
        date: {
          $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
          $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
        },
      })
      .sort({ init: 1, end: 1 })
      .toArray();

    res.json(
      events.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }))
    );

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default events;
