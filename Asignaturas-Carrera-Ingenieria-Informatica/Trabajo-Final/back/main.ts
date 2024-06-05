import { MongoClient, ObjectId } from "npm:mongodb@5";
import { serve } from "std/http/server.ts";

const uri = "mongodb://mongo:27017";
const client = new MongoClient(uri);

const dbName = "Agenda";

await client.connect;
console.log("Connected successfully to Mongo server");

const db = client.db(dbName);
const CollectionUsers = db.collection("Users");
const CollectionTablaInformacion = db.collection("Tabla_Informacion");

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  switch (req.method) {
    case "OPTIONS": {
      return new Response("ok", { status: 200 });
    }
    case "GET": {
      switch (url.pathname) {
        case "/contacts": {
          const contactsEncontrados = await CollectionUsers.find().toArray();

          return new Response(
            JSON.stringify({ contacts: contactsEncontrados }),
            {
              headers: { "content-type": "application/json; charset=utf-8" },
            }
          );
        }
        case "/users": {
          const usersEncontrados = await CollectionUsers.find().toArray();

          return new Response(JSON.stringify({ users: usersEncontrados }), {
            headers: { "content-type": "application/json; charset=utf-8" },
          });
        }
        case "/getUser": {
          try {
            const params = new URLSearchParams(url.search);
            const nombreUsuario = params.get("nombreUsuario");
            const contrasena = params.get("contrasena");

            const userEncontrado = await CollectionUsers.findOne({
              nombreUsuario: nombreUsuario,
              contrasena: contrasena,
            });

            if (userEncontrado) {
              return new Response(
                JSON.stringify({ comprobarUser: userEncontrado }),
                {
                  headers: {
                    "content-type": "application/json; charset=utf-8",
                  },
                }
              );
            } else {
              return new Response("El usuario y contraseña son incorrectos", {
                status: 200,
              });
            }
          } catch (error) {
            return new Response(error, { status: 500 });
          }
        }
        case "/getInformacionTablaUser": {
          try {
            const params = new URLSearchParams(url.search);
            const nombreUsuario = params.get("nombreUsuario");

            const informacionTablaEncontradoPorUser =
              await CollectionTablaInformacion.find({
                nombreUsuario: nombreUsuario,
              }).toArray();

            if (informacionTablaEncontradoPorUser) {
              return new Response(
                JSON.stringify({
                  informacionTabla: informacionTablaEncontradoPorUser,
                }),
                {
                  headers: {
                    "content-type": "application/json; charset=utf-8",
                  },
                }
              );
            } else {
              return new Response("El usuario y contraseña son incorrectos", {
                status: 200,
              });
            }
          } catch (error) {
            return new Response(error, { status: 500 });
          }
        }
        default:
          return new Response("Invalid route", { status: 404 });
      }
    }
    case "DELETE": {
      switch (url.pathname) {
        case "/deleteUser": {
          const params = new URLSearchParams(url.search);
          const idUsuario = params.get("idUsuario");

          try {
            await CollectionUsers.deleteOne({ _id: new ObjectId(idUsuario) });

            return new Response("OK", { status: 200 });
          } catch (error) {
            return new Response(error, { status: 500 });
          }
        }
        case "/deleteInformacionTabla": {
          if (req.body) {
            const body = await req.json();

            try {
              const { filas, nombreUsuario } = body;

              const InformacionTablaEncontrado =
                await CollectionTablaInformacion.findOne({
                  filas: filas,
                  nombreUsuario: nombreUsuario,
                });

              const tablaInformacionBorrar =
                await CollectionTablaInformacion.deleteOne({
                  _id: new ObjectId(InformacionTablaEncontrado._id),
                });

              return new Response(
                JSON.stringify({
                  filas: filas,
                  nombreUsuario: nombreUsuario,
                  _id: tablaInformacionBorrar.insertedId,
                }),
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

    case "POST": {
      switch (url.pathname) {
        case "/addUser": {
          if (req.body) {
            const body = await req.json();

            try {
              const { nombreUsuario, email, contrasena } = body;

              const userEncontrado: boolean = await CollectionUsers.findOne({
                nombreUsuario: nombreUsuario,
              });

              if (userEncontrado) {
                return new Response("El usuario ya existe", { status: 200 });
              }

              const addUser = await CollectionUsers.insertOne({
                nombreUsuario,
                email,
                contrasena,
              });

              return new Response(
                JSON.stringify({
                  nombreUsuario,
                  email,
                  contrasena,
                  id: addUser.insertedId,
                }),
                { status: 200 }
              );
            } catch (error) {
              return new Response(error, { status: 500 });
            }
          } else {
            return new Response("Invalid data", { status: 403 });
          }
        }
        case "/addContact": {
          if (req.body) {
            const body = await req.json();

            try {
              const { name, phone } = body;

              const addUser = await CollectionUsers.insertOne({ name, phone });

              return new Response(
                JSON.stringify({ name, phone, id: addUser.insertedId }),
                { status: 200 }
              );
            } catch (error) {
              return new Response(error, { status: 500 });
            }
          } else {
            return new Response("Invalid data", { status: 403 });
          }
        }

        case "/addInformacion": {
          if (req.body) {
            const body = await req.json();

            try {
              const { filas, columnas, nombreUsuario } = body;

              const addTablaUsuario =
                await CollectionTablaInformacion.insertOne({
                  filas,
                  columnas,
                  nombreUsuario,
                });

              return new Response(
                JSON.stringify({
                  filas,
                  columnas,
                  nombreUsuario,
                  id: addTablaUsuario.insertedId,
                }),
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
