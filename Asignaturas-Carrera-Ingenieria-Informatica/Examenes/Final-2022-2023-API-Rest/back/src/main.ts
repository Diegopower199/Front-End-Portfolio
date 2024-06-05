import { Application, Router } from "oak";
import { deleteEvent } from "./resolvers/delete.ts";
import { getEvent, getEvents } from "./resolvers/get.ts";
import { addEvent } from "./resolvers/post.ts";
import { updateEvent } from "./resolvers/put.ts";

const router = new Router();
router
  .post("/addEvent", addEvent)
  .get("/events", getEvents)
  .get("/event/:id", getEvent)
  .delete("/deleteEvent/:id", deleteEvent)
  .put("/updateEvent", updateEvent);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
