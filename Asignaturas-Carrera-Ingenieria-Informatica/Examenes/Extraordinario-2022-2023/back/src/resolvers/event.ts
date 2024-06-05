import express from "express";
import { ObjectId } from "mongodb";
import client from "../db.ts";
import { DB_NAME } from "../env.ts";
import { EventSchema } from "../types.ts";

const event = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.status(404).json({ message: "Event not Found" });
      return;
    }

    await client.connect();

    const db = client.db(DB_NAME);

    const event = await db
      .collection<EventSchema>("events")
      .findOne({ _id: new ObjectId(id) });

    if (!event) {
      res.status(404).json({ message: "Event not found" });
      client.close();
      return;
    }

    const { _id, ...rest } = event;

    res.json({ id: _id.toString(), ...rest });

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default event;
