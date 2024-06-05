import { MongoClient, ObjectId } from "npm:mongodb@5";
import { serve } from "std/http/server.ts";

const uri = "mongodb://mongo:27017";
const client = new MongoClient(uri);

const dbName = "Agenda";

await client.connect;
console.log("Connected successfully to Mongo server");

const db = client.db(dbName);
const UsersCollection = db.collection("Users");

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  switch (req.method) {
    case "OPTIONS": {
      return new Response("ok", { status: 200 });
    }
    case "GET": {
      switch (url.pathname) {
        case "/contacts": {
          const contacts = await UsersCollection.find().toArray();

          return new Response(JSON.stringify({ contacts }), {
            headers: { "content-type": "application/json; charset=utf-8" },
          });
        }
        default:
          return new Response("Invalid route", { status: 404 });
      }
    }
    case "DELETE": {
      switch (url.pathname) {
        case "/deleteContact": {
          if (req.body) {
            const body = await req.json();
            const id = body.id;

            try {
              await UsersCollection.deleteOne({ _id: new ObjectId(id) });

              return new Response("OK", { status: 200 });
            } catch (error) {
              return new Response(error, { status: 500 });
            }
          } else {
            return new Response("Invalid data", { status: 403 });
          }
        }
        default:
          return new Response("Invalid route", { status: 404 });
      }
    }

    case "POST": {
      switch (url.pathname) {
        case "/addContact": {
          if (req.body) {
            const body = await req.json();

            try {
              const { name, phone } = body;

              const user = await UsersCollection.insertOne({ name, phone });

              return new Response(
                JSON.stringify({ name, phone, id: user.insertedId }),
                { status: 200 }
              );
            } catch (error) {
              return new Response(error, { status: 500 });
            }
          } else {
            return new Response("Invalid data", { status: 403 });
          }
        }
        default:
          return new Response("Invalid route", { status: 404 });
      }
    }
    default:
      return new Response("Invalid method", { status: 405 });
  }
}

console.log("Ready to accept connections on port 8080");
serve(handler, { port: 8080 });
