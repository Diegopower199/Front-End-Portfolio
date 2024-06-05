import cors from "cors";
import express from "express";
import addEvent from "./resolvers/addEvent.ts";
import deleteEvent from "./resolvers/deleteEvent.ts";
import event from "./resolvers/event.ts";
import events from "./resolvers/events.ts";
import updateEvent from "./resolvers/updateEvent.ts";

const app = express();

app.use(cors());
app.use(express.json());

app
  .get("/events", events)
  .get("/event/:id", event)
  .post("/addEvent", addEvent)
  .put("/updateEvent", updateEvent)
  .delete("/deleteEvent/:id", deleteEvent);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
