import { EventsCollection } from "../db.ts";

export const Query = {
  events: async () => {
    return (
      await EventsCollection.find({
        date: { $gte: new Date() },
      })
        .sort({ date: 1, startHour: 1 })
        .toArray()
    ).map((event: any) => {
      event.id = event._id.toString();
      delete event._id;
      return { ...event };
    });
  },
};
